# THIS CLASS IS *****ONLY**** FOR THE COMMAND LINE! It is a debugging tool.
# Nothing more.
class Concept
  attr_reader :taxon_concept

  def self.find(id)
    Concept.new(id)
  end

  def initialize(id)
    @taxon_concept = TaxonConcept.with_titles.find(id)
  end

  def entry(id = nil)
    return @taxon_concept.entry if id.nil?
    entries.find { |e| e.id == id }
  end

  def entries_from(id)
    entries.select { |e| e.hierarchy_id == id }
  end

  def entries
    @taxon_concept.published_hierarchy_entries.
      includes(:hierarchy, { name: :canonical_form })
  end

  def method_missing(method, *args, &block)
    super unless taxon_concept.respond_to?(method)
    # Won't use method_missing next time!
    class_eval { delegate method, to: :taxon_concept }
    taxon_concept.send(method, *args, &block)
  end

  def explain_entries
    entries.group_by(&:hierarchy).each do |hierarchy, h_entries|
      puts "#{hierarchy.label} (#{hierarchy.id}):"
      h_entries.each do |he|
        puts "  #{he.name.string} (#{he.name.canonical_form.string}) => #{he.id}"
      end
    end
    nil
  end

  def explain_relationships(of_entry)
    sim = Hierarchy::Similarity.new
    complete = of_entry.hierarchy.complete?
    explanation = []
    entries.each do |to_entry|
      next if to_entry == of_entry
      score = sim.compare(of_entry, to_entry, complete: complete)
      if score.is_a?(Symbol)
        explanation << "Does not match with #{to_entry.id} "\
          "(#{to_entry.name.string}): #{score}"
      else
        explanation << sim.explain(score)
      end
    end
    puts explanation.join("\n\n")
  end
end