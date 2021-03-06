# donotdisturb

> jQuery.donotdisturb plugin, hide irrelevant element on typing or scroll.


## Getting Started

Install with bower:

```
bower install --save jquery-donotdisturb
```

Or download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/yahiousun/jquery-donotdisturb/master/dist/jquery.donotdisturb.min.js
[max]: https://raw.githubusercontent.com/yahiousun/jquery-donotdisturb/master/dist/jquery.donotdisturb.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/donotdisturb.min.js"></script>
```

### Via data attributes

```html
<body data-spy="donotdisturb">
  <input type="text" class="demo-input" placeholder="focus to active donotdisturb">
  <div class="demo-footer fade" data-irrelevant="donotdisturb">
      scroll to active donotdisturb
  </div>
</body>
```

### Via JavaScript

```html
$(Selector).donotdisturb();
```

### Options

Name          | type          | default       | description
------------- | ------------- | ------------- | -------------
selector      | string        | [data-irrelevant="donotdisturb"]  | irrelevant element selector
scrollspy     | boolean       | true          | show/hide irrelevant element <br>on scroll
typingspy     | boolean       | true          | show/hide irrelevant element <br>when typing
transition    | boolean or string | in          | use css3 transition, <br>add a class to irrelevant element


## License

MIT © yahiousun
