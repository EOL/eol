class PageSerializer
  # TODO:
  # * "provider" for media needs to include the partner's full name.
  # * "media_type" can be skipped; it's implied.
  # * skip "format" for images. Implied.
  # * Check that licenses come across with "name" "source_url", a working "icon_url" and "can_be_chosen_by_partners". ...I think they do, but the icon_url apears to be borked.
  # * references. ...not for this version, buy mark it as TODO.
  # * attributions. Crappy. ...i think we can skip it for the very first version, but soon TODO
  # * sections. Argh. Totally need this for the article, anyway. ...I suppose not RIGHT away, though...
  # * ratings are also TODO, though lower priority.
  # * Think about page content positions. :S
  # * Look at the "media type" that the map comes over as. Looks wrong.
  def self.store_page_id(pid)
    user = EOL::AnonymousUser.new(Language.default)
    # Test with pid = 328598 (Raccoon)
    page = { id: pid, moved_to_node_id: nil }
    # First, get it with supercedure:
    concept = TaxonConcept.find(pid)
    # Then, get it with includes:
    concept = TaxonConcept.where(id: concept.id).
      includes(
        :collections,
        preferred_common_names: [ name: [ canonical_form: :name ] ],
        preferred_entry: [ hierarchy_entry: [ :rank, hierarchy: [ :resource ],
          flattened_ancestors: [ ancestor: [ name: [ canonical_form: :name ] ] ],
          name: [ canonical_form: :name ] ] ]
      ).first
    node = concept.entry
    resource = build_resource(node.hierarchy.resource)

    page[:native_node] = build_node(node, resource)

    page[:vernaculars] = concept.preferred_common_names.map do |cn|
      { string: cn.name.string,
        language: get_language(cn),
        preferred: cn.preferred?
      }
    end

    # NOTE: these were NOT pre-loaded, so we could limit them. Also note that
    # the curated_data_objects_hierarchy_entry CANNOT be preloaded here, since
    # it's invoked via GUID, not by ID (though the relationship could probably
    # be rewritten, that's out of scope, here.)
    page[:media] = concept.data_objects.images.published.
                   includes(:license, :language, :data_object_translation,
                     :users_data_object,
                     data_objects_hierarchy_entries: [ hierarchy_entry:
                     [ hierarchy: [ :resource ] ] ]).
                   limit(100).map do |i|
      lic = i.license
      b_cit = i.bibliographic_citation
      b_cit = nil if b_cit.blank?
      url = i.original_image.sub("_orig.jpg", "")
      resource = build_resource(i.resource)
      { guid: i.guid,
        resource_pk: i.identifier,
        provider_type: "Resource",
        provider: resource,
        media_type: "image",
        format: "jpg",
        license: { name: lic.title, source_url: lic.source_url,
          icon_url: lic.logo_url, can_be_chosen_by_partners: lic.show_to_content_partners } ,
        language: get_language(i),
        # TODO: skipping location here
        bibliographic_citation: b_cit,
        owner: i.owner,
        name: i.best_title,
        source_url: i.source_url,
        description: i.description_linked,
        base_url: url
      }
    end

    article = concept.overview_text_for_user(user)
    lic = article.license
    b_cit = article.bibliographic_citation
    b_cit = nil if b_cit.blank?
    resource = build_resource(article.resource)
    page[:articles] = [{
      guid: article.guid,
      resource_pk: article.identifier,
      provider_type: "Resource",
      provider: resource,
      license: { name: lic.title, source_url: lic.source_url,
        icon_url: lic.logo_url, can_be_chosen_by_partners: lic.show_to_content_partners } ,
      language: get_language(article),
      # TODO: skipping location here
      bibliographic_citation: b_cit,
      owner: article.owner,
      name: article.best_title,
      source_url: article.source_url,
      body: article.description_linked
    }]

    traits = PageTraits.new(pid).traits
    page[:traits] = traits.map do |trait|
      value = trait.value_uri.is_a?(KnownUri) ? trait.value_uri.uri : trait.value_name
      # TODO: a lot to add here, importantly the source. ...but we don't *need* it yet.
      trait_hash = { uri: trait.uri.to_s,
        predicate: trait.predicate,
        value: value
      }
      trait_hash[:units] = trait.units_uri.uri if trait.units_uri
      trait_hash
    end

    page[:collections] = concept.collections.map do |col|
      { name: col.name,
        description: col.description,
        icon: col.logo_url
      }
    end

    if concept.page_feature.map_json?
      page[:json_map] = true
    end

    map = concept.get_one_map_from_solr.first
    if map
      lic = article.license
      b_cit = article.bibliographic_citation
      b_cit = nil if b_cit.blank?
      resource = build_resource(map.resource)
      url = i.original_image.sub("_orig.jpg", "")
      page[:maps] = [{
        guid: map.guid,
        resource_pk: map.identifier,
        provider_type: "Resource",
        provider: resource,
        media_type: "image",
        format: "jpg",
        license: { name: lic.title, source_url: lic.source_url,
          icon_url: lic.logo_url, can_be_chosen_by_partners: lic.show_to_content_partners } ,
        language: get_language(map),
        bibliographic_citation: b_cit,
        owner: map.owner,
        name: map.best_title,
        source_url: map.source_url,
        base_url: url
      }]
    end

    name = Rails.root.join("public", "store-#{pid}.json").to_s
    File.unlink(name) if File.exist?(name)
    File.open(name, "w") { |f| f.puts(JSON.pretty_generate(page)) }
  end

  def get_language(object)
    return "eng" unless object.language
    l_code = object.language.iso_639_3
    l_code.blank? ? "eng" : l_code
  end

  def build_resource(resource)
    { name: resource.title, partner: resource.content_partner.name) }
  end

  def build_node(node, resource)
    return nil unless node
    {
      resource: resource,
      rank: node.rank.label,
      lft: node.lft,
      rgt: node.rgt,
      scientific_name: node.italicized_name,
      canonical_form: node.title_canonical_italicized,
      resource_pk: node.identifier,
      source_url: node.source_url,
      parent: build_node(node.parent, resource)
    }
  end
end
