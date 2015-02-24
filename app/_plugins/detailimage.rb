module Jekyll
  class DetailImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text.split(' "')
      @url = @params[0]
      @description = @params[1].split('"')[0]

    end

    def render(context)
      "<div class='detailimage'><img src='#{@url}'><div class='detailimage-description'>#{@description}</div></div>"
    end
  end
end

Liquid::Template.register_tag('detailimage', Jekyll::DetailImageTag)
