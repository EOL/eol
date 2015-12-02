class PageTraits
  A_URI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
  PREFIXES = {
    dc: 'http://purl.org/dc/terms/',
    dwc: 'http://rs.tdwg.org/dwc/terms/',
    eol: 'http://eol.org/schema/',
    eolterms: 'http://eol.org/schema/terms/',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    gbif: 'http://rs.gbif.org/terms/1.0/',
    foaf: 'http://xmlns.com/foaf/0.1/'
  }

  attr_accessor :points, :glossary, :traits, :sources

  # NOTE: This wasn't actually what you wanted to do. You wanted to build the
  # jsonld first, then use that to populate the page! Drat. TODO TODO TODO TODO
  # ...I suppose we could just do that here: from_json and to_json on this class
  # would do the trick. Nice! Do that.

  def initialize(id)
    @id = id
    @rdf = TraitBank.page_with_traits(id)
    trait_uris = Set.new(@rdf.map { |trait| trait[:trait] })
    @points = DataPointUri.where(uri: trait_uris.to_a.map(&:to_s)).
      includes(:comments)
    uris = Set.new(@rdf.flat_map { |trait|
      trait.values.select { |v| v.uri? } })
    @glossary = KnownUri.where(uri: uris.to_a.map(&:to_s))
    traits = @rdf.group_by { |trait| trait[:trait] }
    @traits = traits.keys.map { |trait| Trait.new(traits[trait], self) }
    source_ids = Set.new(@traits.map { |trait| trait.source_id })
    source_ids.delete(nil) # Just in case.
    @sources = Resource.where(id: source_ids.to_a).includes(:content_partner)
  end

  # NOTE: this is largely copied from TaxonDataSet#to_jsonld, because it will
  # eventually replace it, so the duplication will go away. No point in
  # generalizing. TODO: this doesn't belong here; make a new class and pass self
  # in. NOTE: jsonld is ALWAYS in English. Period. This is expected and normal.
  def to_jsonld
    concept = TaxonConcept.find(@id)
    jsonld = { '@graph' => [ concept.to_jsonld ] }
    if wikipedia_entry = concept.wikipedia_entry
      jsonld['@graph'] << wikipedia_entry.mapping_jsonld
    end
    concept.common_names.map do |tcn|
      jsonld['@graph'] << tcn.to_jsonld
    end
    prefixes = {}
    PREFIXES.each { |k,v| prefixes[v] = "#{k}:" }
    points = @traits.map(&:point)
    DataPointUri.assign_references(points, Language.english)
    @traits.each do |trait|
      # NOTE: this block was (mostly) stolen from DataPointUri#to_jsonld, and,
      # again, will replace it.
      trait_json = {
        '@id' => trait.point.uri,
        'data_point_uri_id' => trait.point.id,
        '@type' => trait.association? ? 'eol:Association' : 'dwc:MeasurementOrFact',
        'dwc:taxonID' => KnownUri.taxon_uri(@id),
      }
      trait.rdf.each do |rdf|
        predicate = rdf[:trait_predicate].to_s
        # They don't care about the type we store it as...
        next if predicate == A_URI
        prefixes.each { |r,v| predicate.sub!(r,v) }
        trait_json[predicate] = rdf[:value].to_s
      end
      # Associations needs a _little_ tweaking:
      if trait.association?
        trait_json['eol:associationType'] =
          trait_json.delete('dwc:measurementType')
        trait_json['eol:targetTaxonID'] = trait.value_name
      end
      refs = trait.point.references
      unless refs.blank?
        trait_json[I18n.t(:reference)] = refs.map { |r| r[:full_reference].to_s }.join("\n")
      end
      jsonld['@graph'] << trait_json
    end
    add_default_context(jsonld)
    # I'm not sure we were ever doing this "right". :\ TODO: is this even useful?
    @glossary.each do |uri|
      jsonld['@context'][uri.name] = uri.uri
    end
    jsonld
  end

  # NOTE: again, stolen from TaxonDataSet#default_context ; replaces it.
  def add_default_context(jsonld)
    # TODO: @context doesn't need all of these. Look through the @graph and
    # add things as needed based on the Sparql headers, then add the @ids.
    jsonld['@context'] = {
      'dwc:taxonID' => { '@type' => '@id' },
      'dwc:resourceID' => { '@type' => '@id' },
      'dwc:relatedResourceID' => { '@type' => '@id' },
      'dwc:relationshipOfResource' => { '@type' => '@id' },
      'dwc:vernacularName' => { '@container' => '@language' },
      'eol:associationType' => { '@type' => '@id' },
      'rdfs:label' => { '@container' => '@language' }
    }
    PREFIXES.each do |pre, val|
      jsonld['@context'][pre.to_s] = val
    end
    jsonld
  end
end
