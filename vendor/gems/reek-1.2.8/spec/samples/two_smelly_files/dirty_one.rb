# smelly class for testing purposes
class Dirty
  def a
    puts @s.title
    @s = puts.map {|x| x.each {|key| key += 3}}
    puts @s.title
  end
end
