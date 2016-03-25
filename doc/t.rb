# This is a temp file used for notes. Ignore it entirely!

params = {page: 1, exact: true, id: "Cistanthe weberbaueri (Diels) Carolin ex M.A.Hershkovitz"}
params[:q] = params[:id]

results = EOL::Api::Search::V1_0.prepare_hash(params)

@solr = SolrCore::SiteSearch.new
query = [params[:q].gsub(/"/, "\\\"").fix_spaces]
query = if params[:exact]
  "keyword_exact:\"#{query}\"^5"
else
  "(keyword_exact:\"#{query}\"^5 OR "\
    "#{EOL::Solr::SiteSearch.keyword_field_for_term(query)}:\"#{query}\"~10^2)"
end
options = { sort: "resource_weight+asc,score+desc" }
if id = params[:filter_by_taxon_concept_id]
  query += "AND (ancestor_taxon_concept_id:#{id})"
elsif params[:filter_by_hierarchy_entry_id]
  id = HierarchyEntry.where(id: params[:filter_by_hierarchy_entry_id]).
    pluck(:taxon_concept_id).first
  query += "AND (ancestor_taxon_concept_id:#{id})"
end
@solr.query(bits, options)

# --

resource = Resource.find(544)
event = resource.harvest_events.last
@solr = SolrCore::SiteSearch.new
@solr.index_type(TaxonConcept, HierarchyEntry.where(id: event.new_hierarchy_entry_ids).pluck(:taxon_concept_id))


# Delete me later!

@resource = Resource.find 974 # North American Butterflies and Skippers

concept1 = TaxonConcept.find 45882481
concept2 = TaxonConcept.find 250906

entry1 = HierarchyEntry.find 63226353
entry2 = HierarchyEntry.find 55715950

@solr = SolrCore::HierarchyEntryRelationships.new
@hierarchy = Hierarchy.find 1505
@compared = []
@all_hierarchies = false
@confirmed_exclusions = {}
@entries_matched = []
@supercedures = {} # The ones we do
@superceded = {} # ALL superceded ids we encounter, ever (saves queries)
@visible_id = Visibility.get_visible.id
@preview_id = Visibility.get_preview.id
@per_page = 10
page = 1

hierarchy1 = @hierarchy
hierarchy2 = Hierarhcy.find 903

matches_in_h1 = @solr.paginate("hierarchy_id_1:#{hierarchy1.id} AND (visibility_id_1:#{@visible_id} OR visibility_id_1:#{@preview_id}) AND same_concept:false AND (relationship:name OR confidence:[0.25 TO *])", per_page: 2)["response"]["numFound"]

full_q = "hierarchy_id_1:#{hierarchy1.id} AND (visibility_id_1:#{@visible_id} OR visibility_id_1:#{@preview_id}) AND hierarchy_id_2:#{hierarchy2.id} AND (visibility_id_2:#{@visible_id} OR visibility_id_2:#{@preview_id}) AND same_concept:false"
options = { sort: "relationship asc, visibility_id_1 asc, visibility_id_2 asc, confidence desc, hierarchy_entry_id_1 asc, hierarchy_entry_id_2 asc"}.merge(page: page, per_page: @per_page)
response = @solr.paginate(full_q, options)
entries = response["response"]["docs"]

# - Moving backward to Relator...

@solr = SolrCore::HierarchyEntries.new
response = @solr.paginate("hierarchy_id:#{@hierarchy.id}", page: page, per_page: @per_page)
entries = response["response"]["docs"]
entries_in_solr = @solr.paginate("hierarchy_id:#{@hierarchy.id}", page: page, per_page: 1)["response"]["numFound"]

from_entry = @solr.paginate("id:#{entry1.id}", page: page, per_page: 1)["response"]["docs"][0]
to_entry = @solr.paginate("id:#{entry2.id}", page: page, per_page: 1)["response"]["docs"][0]


# When ready:
@resource = Resource.find 974
@resource.preview
