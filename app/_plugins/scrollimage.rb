module Jekyll
  class ScrollImageTag < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url
    end

    def render(context)
      "<div class='scrollimage'><img src='#{@url}'></div>"
    end
  end
end

Liquid::Template.register_tag('scrollimage', Jekyll::ScrollImageTag)