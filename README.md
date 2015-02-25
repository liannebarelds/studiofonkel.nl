# studiofonkel.nl
*How to update studiofonkel.nl in markdown* - by LaurenzDaBest
***

## Images:

`{% image "[IMG URL]" "[STYLE]" "[DESCRIPTION]" "[ALT/TITLE] %}`

*For example:*
```
{% image "http://placehold.it/400x200/" "default" "Fig.1: I'm just a designertje." "Designer" %}
```

###List of image-styles:
* `default` - just an image
* `scroll` - parallax image
* `large` - full-width image

## Case files:
`{% case_tags %}` // prints tags from the case