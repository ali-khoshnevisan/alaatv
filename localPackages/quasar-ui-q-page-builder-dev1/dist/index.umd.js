/*!
 * quasar-ui-q-page-builder v0.1.72
 * (c) 2023 kerasus <aliesmaeeli20@gmail.com>
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('quasar'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['quasar', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QPageBuilder = factory(global.Quasar, global.Vue));
})(this, (function (quasar, vue) { 'use strict';

  var name = "quasar-ui-q-page-builder";
  var version$1 = "0.1.72";
  var author = "kerasus <aliesmaeeli20@gmail.com>";
  var description = "QPageBuilder";
  var license = "MIT";
  var module = "dist/index.esm.js";
  var main = "dist/index.common.js";
  var scripts = {
  	tt: "echo 'enter location' && read location && echo [$location]",
  	lint: "eslint --fix --ext .js,.vue ./",
  	dev: "cd dev && yarn dev && cd ..",
  	"dev:umd": "yarn build && node build/script.open-umd.js",
  	"dev:ssr": "cd dev && yarn 'dev:ssr' && cd ..",
  	"dev:ios": "cd dev && yarn 'dev:ios' && cd ..",
  	"dev:android": "cd dev && yarn 'dev:android' && cd ..",
  	"dev:electron": "cd dev && yarn 'dev:electron' && cd ..",
  	build: "node build/index.js",
  	"build:js": "node build/script.javascript.js",
  	"build:css": "node build/script.css.js",
  	pub: "npm version patch && yarn build && npm publish"
  };
  var repository = {
  	type: "git",
  	url: ""
  };
  var dependencies = {
  	"@quasar/extras": "^1.16.1",
  	"@vue/compiler-sfc": "^3.2.47",
  	quasar: "^2.11.9",
  	shvl: "^3.0.0",
  	vue: "^3.2.47"
  };
  var bugs = "";
  var homepage = "";
  var devDependencies = {
  	"@babel/plugin-proposal-optional-chaining": "^7.18.9",
  	"@quasar/app-webpack": "^3.7.2",
  	"@rollup/plugin-buble": "^1.0.1",
  	"@rollup/plugin-commonjs": "^23.0.3",
  	"@rollup/plugin-json": "^5.0.2",
  	"@rollup/plugin-node-resolve": "^15.0.1",
  	"@rollup/plugin-replace": "^5.0.1",
  	autoprefixer: "^10.4.13",
  	chalk: "^4.1.0",
  	"core-js": "^3.26.1",
  	cssnano: "^5.1.14",
  	eslint: "8.22.0",
  	"eslint-config-standard": "^17.0.0",
  	"eslint-plugin-import": "^2.26.0",
  	"eslint-plugin-n": "^15.6.0",
  	"eslint-plugin-promise": "^6.1.1",
  	"eslint-plugin-vue": "^9.9.0",
  	"fs-extra": "^11.1.0",
  	open: "^8.4.0",
  	postcss: "^8.4.19",
  	rimraf: "^3.0.2",
  	rollup: "^3.5.0",
  	"rollup-plugin-commonjs": "^10.1.0",
  	"rollup-plugin-scss": "^4.0.0",
  	"rollup-plugin-vue": "^6.0.0",
  	rtlcss: "^4.0.0",
  	sass: "^1.56.1",
  	"uglify-js": "^3.17.4",
  	"vue-router": "^4.1.6",
  	zlib: "^1.0.5"
  };
  var browser = {
  	fs: false,
  	path: false,
  	os: false
  };
  var browserslist = [
  	"last 4 Chrome versions",
  	"last 4 Firefox versions",
  	"last 2 Edge versions",
  	"last 4 Safari versions",
  	"last 4 Android versions",
  	"last 4 ChromeAndroid versions",
  	"last 4 FirefoxAndroid versions",
  	"last 4 iOS versions"
  ];
  var pkg = {
  	name: name,
  	version: version$1,
  	author: author,
  	description: description,
  	license: license,
  	module: module,
  	main: main,
  	scripts: scripts,
  	repository: repository,
  	dependencies: dependencies,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies,
  	browser: browser,
  	browserslist: browserslist
  };

  var mixinWidget = {
    props: {
      data: {
        type: Object,
        default: null
      },
      editable: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: function default$1() {
          return {}
        }
      },
      dragStatus: {
        type: String,
        default: null
      }
    },
    data: function data() {
      return {
        defaultOptions: {
          className: ''
        }
      }
    },
    methods: {
      getUpdateClassNamesWithKey: function getUpdateClassNamesWithKey (className, key, state) {
        var finalClassString = ' ' + key + ' ';
        if (state && className.search(finalClassString) === -1) {
          className += finalClassString;
        }
        if (!state) {
          className = className.replaceAll(finalClassString, ' ');
        }

        return className
      }
    }
  };

  var OptionPanel = {
    data: function () {
      return {
        defaultOptions: {}
      }
    },
    watch: {
      localOptions: {
        handler: function handler(newValue) {
          this.updateLocalOptions(newValue);
        },
        deep: true
      }
    },
    props: {
      data: {
        type: Object,
        default: function () {
        }
      },
      options: {
        type: Object,
        default: function () {
        }
      }
    },
    computed: {
      localOptions: {
        get: function get() {
          return Object.assign(this.defaultOptions, this.options)
        },
        set: function set(newValue) {
          this.updateLocalOptions(newValue);
        }
      }
    },
    methods: {
      removeNullKeys: function removeNullKeys () {

      },
      takeAction: function takeAction() {
        if (!this.localOptions.action.hasAction) {
          return
        } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'scroll') {
          this.scrollToElement(this.localOptions.action.scrollTo);
        } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'link') {
          this.redirectRoute(this.localOptions.action.route);
        } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'event') {
          this.$bus.emit(this.localOptions.action.eventName, this.localOptions.action.eventArgs);
        }
      },
      scrollToElement: function scrollToElement(className) {
        var el = document.getElementsByClassName(className)[0];
        var headerOffset = 0;
        var elementPosition = el.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      },
      redirectRoute: function redirectRoute(url) {
        if ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1)) {
          window.open(url, '_blank');
        } else {
          this.$router.push(url);
        }
      },
      updateLocalOptions: function updateLocalOptions (newValue) {
        var newVal = newValue || this.localOptions;
        this.$emit('update:options', newVal);
      }
    }
  };

  var script$n = vue.defineComponent({
    name: 'EditorBox',
    props: {
      label: {
        type: String,
        default: null
      },
      position: {
        type: Number,
        default: 1
      },
      showAdd: {
        type: Boolean,
        default: true
      },
      showEdit: {
        type: Boolean,
        default: true
      },
      showDelete: {
        type: Boolean,
        default: true
      },
      showImport: {
        type: Boolean,
        default: true
      },
      showExport: {
        type: Boolean,
        default: true
      },
      showDuplicate: {
        type: Boolean,
        default: true
      }
    },
    emits: ['callAction']
  });

  function render$p(_ctx, _cache, $props, $setup, $data, $options) {
    var obj;

    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_btn_group = vue.resolveComponent("q-btn-group");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([( obj = {}, obj['position-'+_ctx.position] = true, obj ), "widget-editor-box"])
    }, [
      vue.createVNode(_component_q_btn_group, {
        outline: "",
        flat: "",
        class: "edit-toolbar"
      }, {
        default: vue.withCtx(function () { return [
          (_ctx.showDelete)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 0,
                outline: "",
                color: "white",
                icon: "delete",
                size: "xs",
                onClick: _cache[0] || (_cache[0] = function ($event) { return (_ctx.$emit('callAction', 'delete')); })
              }))
            : vue.createCommentVNode("", true),
          (_ctx.showAdd)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 1,
                outline: "",
                color: "white",
                icon: "add",
                size: "xs",
                onClick: _cache[1] || (_cache[1] = function ($event) { return (_ctx.$emit('callAction', 'add')); })
              }))
            : vue.createCommentVNode("", true),
          (_ctx.showDuplicate)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 2,
                outline: "",
                color: "white",
                icon: "content_copy",
                size: "xs",
                onClick: _cache[2] || (_cache[2] = function ($event) { return (_ctx.$emit('callAction', 'duplicate')); })
              }))
            : vue.createCommentVNode("", true),
          (_ctx.showEdit)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 3,
                outline: "",
                color: "white",
                icon: "edit",
                size: "xs",
                onClick: _cache[3] || (_cache[3] = function ($event) { return (_ctx.$emit('callAction', 'edit')); })
              }))
            : vue.createCommentVNode("", true),
          (_ctx.showExport)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 4,
                outline: "",
                color: "white",
                icon: "file_upload",
                size: "xs",
                onClick: _cache[4] || (_cache[4] = function ($event) { return (_ctx.$emit('callAction', 'export')); })
              }))
            : vue.createCommentVNode("", true),
          (_ctx.showImport)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 5,
                outline: "",
                color: "white",
                icon: "file_download",
                size: "xs",
                onClick: _cache[5] || (_cache[5] = function ($event) { return (_ctx.$emit('callAction', 'import')); })
              }))
            : vue.createCommentVNode("", true),
          (_ctx.label)
            ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                key: 6,
                outline: "",
                color: "white",
                size: "sm",
                label: _ctx.label
              }, null, 8, ["label"]))
            : vue.createCommentVNode("", true)
        ]; }),
        _: 1
      })
    ], 2))
  }

  script$n.render = render$p;
  script$n.__scopeId = "data-v-f1b80a5c";

  var defaultOptions$2 = {
    colNumber: 'col',
    style: {},
    boxShadows: [],
    backgrounds: {
      xs: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      sm: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      md: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      lg: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      xl: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      }
    },
    responsiveOrder: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null
    },
    borderStyle: {
      borderCssString: '',
      borderRadiusCssString: ''
    },
    cssHoverEffects: {
      boxShadows: [],
      borderStyle: {
        borderCssString: '',
        borderRadiusCssString: ''
      },
      transition: {
        time: 0
      },
      transform: {
        rotate: null,
        scaleX: null,
        scaleY: null,
        skewX: null,
        skewY: null,
        translateX: null,
        translateY: null
      }
    },
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
    className: ''
  };

  var components$3 = {
    EditorBox: script$n
  };

  components$3.PageBuilderSection = vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return Section; }); });

  var script$m = {
    name: 'PageBuilderWidget',
    components: components$3,
    mixins: [mixinWidget],
    props: {
      widget: {
        type: Object,
        default: function () {
          return {}
        }
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    emits: ['onOptionAction'],
    setup: function setup(props, ref) {
      var emit = ref.emit;

      var $q = quasar.useQuasar();
      if ($q.$pageBuilderWidgetComponents) {
        Object.assign(components$3, $q.$pageBuilderWidgetComponents);
      }

      var hasOptionPanel = vue.computed(function () {
        // return !!Object.keys($q.$pageBuilderWidgetOptionPanels).find(key => $q.$pageBuilderWidgetOptionPanels[key].name === props.widget.name)
        return !!Object.keys($q.$pageBuilderWidgetOptionPanels).find(function (key) { return key === props.widget.name + 'OptionPanel'; })
      });

      var callAction = function (event) {
        var path = {
          node: 'widgets'
        };
        var data = {
          event: event,
          path: path,
          node: 'widgets'
        };
        emit('onOptionAction', data);
      };

      var onOptionAction = function (data) {
        emit('onOptionAction', data);
      };

      return {
        onOptionAction: onOptionAction,
        hasOptionPanel: hasOptionPanel,
        callAction: callAction
      }
    }
  };

  function render$o(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_editor_box = vue.resolveComponent("editor-box");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([{'editable': $props.editable && $props.widget.name !== 'page-builder-section'}, "page-builder-widget"])
    }, [
      ($props.editable && $props.widget.name !== 'page-builder-section')
        ? (vue.openBlock(), vue.createBlock(_component_editor_box, {
            key: 0,
            label: $props.widget.name,
            "show-add": false,
            "show-edit": $setup.hasOptionPanel,
            onCallAction: $setup.callAction
          }, null, 8, ["label", "show-edit", "onCallAction"]))
        : vue.createCommentVNode("", true),
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.widget.name), {
        data: $props.widget.data,
        options: $props.widget.options,
        editable: $props.editable
      }, null, 8, ["data", "options", "editable"]))
    ], 2))
  }

  script$m.render = render$o;
  script$m.__scopeId = "data-v-e138c9be";

  var __default__$2 = {
    name: 'PageBuilderCol',
    components: {
      EditorBox: script$n,
      PageBuilderWidget: script$m
    },
    mixins: [mixinWidget],
    props: {
      widgets: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    emits: ['onOptionAction', 'update:options', 'onDrag'],
    setup: function setup(props, ref$1) {
      var emit = ref$1.emit;

      var $q = quasar.useQuasar();
      var computedWidget = vue.computed({
        get: function () { return props.widgets; },
        set: function (value) { return emit('update:widget', value); }
      });
      var eventWidget = vue.ref({});
      var localDraggable = vue.ref(null);
      var action = vue.ref('');
      var elementFormDialog = vue.ref(false);
      var form = vue.ref({});
      var callAction = function (event) {
        var path = {
          node: 'cols'
        };
        var data = {
          event: event,
          path: path,
          name: 'col'
        };
        emit('onOptionAction', data);
      };

      var onOptionAction = function (data, widgetItem) {
        var event = data.event;

        data.path.index = widgetItem.widgetIndex;
        var path = {
          node: 'cols',
          child: data.path
        };
        var emitData = {
          event: event,
          path: path,
          name: data.name,
          nodeName: data.nodeName,
          widget: data.widget ? data.widget : widgetItem.widget,
          widgetIndex: data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
        };
        emit('onOptionAction', emitData);
      };

      var onSubmitElement = function (widget) {
        var widgetData = widget.item.type === 'widget' ? widget.item : widget.item.info;
        if (widget.item.info !== undefined) {
          widgetData.options = widget.options;
        }
        if (action.value === 'add') {
          if (widget.item.type === 'widget') {
            $q.notify({
              message: 'المانی به این المان نمی توانید اضافه کنید',
              color: 'red'
            });
          } else {
            computedWidget.value[eventWidget.value.widgetIndex].data.rows.push(widgetData);
          }
        } else if (action.value === 'edit') {
          computedWidget[eventWidget.value.widgetIndex] = widgetData;
        }
        elementFormDialog.value = false;
      };

      var onDragStart = function (event, widget, widgetIndex) {
        if (!props.editable) {
          return
        }
        event.stopPropagation();
        emit('onDrag', 'DragStart');
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('value', JSON.stringify({ widget: widget, widgetIndex: widgetIndex }));
        localDraggable.value = event;
        // console.log('onDragStart', event.dataTransfer.getData('value'))
      };

      var onDragOver = function (event) {
        if (!props.editable) {
          return
        }
        event.preventDefault();
        // console.log('onDragOver', event.dataTransfer.getData('value'))
      };

      var onDragLeave = function (event) {
        // if (!props.editable) {
        //
        // }
        /*
        ev.target.style.marginTop = '2px'
        ev.target.style.marginBottom = '2px'
        */
        // console.log('onDragLeave', event.dataTransfer.getData('value'))
      };

      // dragEnter(ev) {
      //   /*
      //   if (ev.clientY > ev.target.height / 2) {
      //     ev.target.style.marginBottom = '10px'
      //   } else {
      //     ev.target.style.marginTop = '10px'
      //   }
      //   */
      // },

      var onDrop = function (event, newIndex, parent) {
        if (!props.editable) {
          return
        }
        var valueStringField = event.dataTransfer.getData('value');
        var value = valueStringField ? JSON.parse(valueStringField) : null;
        var widget = value.widget;
        var widgetOldIndex = value.widgetIndex;
        var widgetNewIndex = newIndex;
        var dragedObjectIsWidget = !!widget.name;
        if (!dragedObjectIsWidget) {
          event.stopPropagation();
          return
        }
        if (localDraggable.value) {
          updatePosition(computedWidget.value, widgetOldIndex, widgetNewIndex);
        } else {
          addToIndex(computedWidget.value, widget, widgetNewIndex);
        }

        localDraggable.value = null;
        emit('onDrag', 'Drop');
        event.stopPropagation();
      };

      var updatePosition = function (list, oldIndex, newIndex) {
        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      };

      var addToIndex = function (list, newItem, index) {
        if (list.length > index) {
          list.splice(index, 0, newItem);
        } else {
          list.push(newItem);
        }
      };

      var removeFromIndex = function (list, index) {
        list.splice(index, 1);
      };

      return {
        onDrop: onDrop,
        onDragOver: onDragOver,
        onDragLeave: onDragLeave,
        onDragStart: onDragStart,
        removeFromIndex: removeFromIndex,
        localDraggable: localDraggable,

        action: action,
        form: form,
        computedWidget: computedWidget,
        elementFormDialog: elementFormDialog,
        callAction: callAction,
        onSubmitElement: onSubmitElement,
        onOptionAction: onOptionAction
      }
    },
    data: function data() {
      return {
        defaultOptions: JSON.parse(JSON.stringify(defaultOptions$2))
      }
    },
    computed: {
      responsiveShow: function responsiveShow () {
        var this$1$1 = this;

        var responsiveShow = '';
        Object.keys(this.colOptions.responsiveShow).forEach(function (key) {
          if (this$1$1.colOptions.responsiveShow[key] === false) {
            responsiveShow += key + '-hide ';
          }
        });

        return ' ' + responsiveShow
      },
      shadows: function shadows() {
        var shadows = [];
        this.colOptions.boxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      hoverShadows: function hoverShadows() {
        var shadows = [];
        this.colOptions.cssHoverEffects.boxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      colClassName: function colClassName () {
        var colNumber = this.colNumber ? this.colNumber : '';

        return this.colOptions.className + ' ' + colNumber + this.responsiveShow
      },
      optionsClassName: function optionsClassName () {
        return this.colOptions.className
      },
      colOptions: {
        get: function get() {
          return Object.assign(this.defaultOptions, this.options)
        },
        set: function set(newValue) {
          this.$emit('update:options', newValue);
        }
      },
      colNumber: function colNumber () {
        return this.colOptions.colNumber
      }
    },
    watch: {
      editable: {
        handler: function handler() {
          this.computeOptionsClassName();
        },
        immediate: true
      },
      dragStatus: function dragStatus(newValue) {
        if (newValue === 'Drop' && this.localDraggable) {
          var valueStringfied = event.dataTransfer.getData('value');
          var value = valueStringfied ? JSON.parse(valueStringfied) : null;
          var widgetOldIndex = value.widgetIndex;
          this.removeFromIndex(this.computedWidget, widgetOldIndex);
        }
        if (newValue === 'Drop') {
          this.localDraggable = null;
        }
      },
      optionsClassName: {
        handler: function handler() {
          this.computeOptionsClassName();
        },
        immediate: true
      }
    },
    methods: {
      computeOptionsClassName: function computeOptionsClassName () {
        this.colOptions.className = this.getUpdateClassNamesWithKey(this.colOptions.className, 'editable', this.editable);
      }
    }
  };
  var __injectCSSVars__$2 = function () {
  vue.useCssVars(function (_ctx) { return ({
    "424fd0b4": (_ctx.shadows),
    "1027edb6": (_ctx.hoverShadows),
    "7490ebae": (_ctx.colOptions.borderStyle.borderCssString),
    "76892088": (_ctx.colOptions.borderStyle.borderRadiusCssString),
    "30d2bf09": (_ctx.colOptions.cssHoverEffects.borderStyle.borderCssString),
    "1cea12d7": (_ctx.colOptions.cssHoverEffects.borderStyle.borderRadiusCssString),
    "593ac914": (_ctx.colOptions.cssHoverEffects.transform.skewX),
    "593ac912": (_ctx.colOptions.cssHoverEffects.transform.skewY),
    "d10a491a": (_ctx.colOptions.cssHoverEffects.transform.rotate),
    "cf03c334": (_ctx.colOptions.cssHoverEffects.transform.scaleX),
    "cf03c332": (_ctx.colOptions.cssHoverEffects.transform.scaleY),
    "05bf2a3c": (_ctx.colOptions.cssHoverEffects.transform.translateX),
    "05bf2a3a": (_ctx.colOptions.cssHoverEffects.transform.translateY),
    "7c3618a0": (_ctx.colOptions.cssHoverEffects.transition.time),
    "142f02d9": (_ctx.defaultOptions.backgrounds.xs.size),
    "70d2678b": (_ctx.defaultOptions.backgrounds.xs.color),
    "7125e183": (_ctx.defaultOptions.backgrounds.xs.image),
    "7af00b1a": (_ctx.defaultOptions.backgrounds.xs.repeat),
    "f1e2dffe": (_ctx.defaultOptions.backgrounds.xs.position),
    "3650f9fb": (_ctx.defaultOptions.backgrounds.xs.attachment),
    "0172c6da": (_ctx.defaultOptions.backgrounds.sm.size),
    "2c0723aa": (_ctx.defaultOptions.backgrounds.sm.color),
    "2c5a9da2": (_ctx.defaultOptions.backgrounds.sm.image),
    "6deac234": (_ctx.defaultOptions.backgrounds.sm.repeat),
    "364328fc": (_ctx.defaultOptions.backgrounds.sm.position),
    "5f97f93c": (_ctx.defaultOptions.backgrounds.sm.attachment),
    "969c7486": (_ctx.defaultOptions.backgrounds.md.size),
    "3eaffdb2": (_ctx.defaultOptions.backgrounds.md.color),
    "3e0909c2": (_ctx.defaultOptions.backgrounds.md.image),
    "4d659457": (_ctx.defaultOptions.backgrounds.md.repeat),
    "5e257e36": (_ctx.defaultOptions.backgrounds.md.position),
    "f971fc42": (_ctx.defaultOptions.backgrounds.md.attachment),
    "f62bd74e": (_ctx.defaultOptions.backgrounds.lg.size),
    "1779860b": (_ctx.defaultOptions.backgrounds.lg.color),
    "17cd0003": (_ctx.defaultOptions.backgrounds.lg.image),
    "1e76a81a": (_ctx.defaultOptions.backgrounds.lg.repeat),
    "18e4e181": (_ctx.defaultOptions.backgrounds.lg.position),
    "a84e290a": (_ctx.defaultOptions.backgrounds.lg.attachment),
    "083d1680": (_ctx.defaultOptions.backgrounds.xl.size),
    "02f26e78": (_ctx.defaultOptions.backgrounds.xl.color),
    "024b7a88": (_ctx.defaultOptions.backgrounds.xl.image),
    "29407f4c": (_ctx.defaultOptions.backgrounds.xl.repeat),
    "4de70fb0": (_ctx.defaultOptions.backgrounds.xl.position),
    "00757462": (_ctx.defaultOptions.backgrounds.xl.attachment),
    "7dceea01": (_ctx.defaultOptions.responsiveOrder.xs),
    "7dcee960": (_ctx.defaultOptions.responsiveOrder.sm),
    "7dcee89d": (_ctx.defaultOptions.responsiveOrder.md),
    "7dcee881": (_ctx.defaultOptions.responsiveOrder.lg),
    "7dcee9fa": (_ctx.defaultOptions.responsiveOrder.xl)
  }); });};
  var __setup__$2 = __default__$2.setup;
  __default__$2.setup = __setup__$2
    ? function (props, ctx) { __injectCSSVars__$2();return __setup__$2(props, ctx) }
    : __injectCSSVars__$2;

  var _hoisted_1$j = {
    key: 0,
    class: "editable-wrapper"
  };

  function render$n(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_editor_box = vue.resolveComponent("editor-box");
    var _component_page_builder_widget = vue.resolveComponent("page-builder-widget");
    var _component_q_intersection = vue.resolveComponent("q-intersection");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["page-builder-col", $options.colClassName]),
      style: vue.normalizeStyle($options.colOptions.style),
      onDragover: _cache[0] || (_cache[0] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($setup.onDragOver && $setup.onDragOver.apply($setup, args));
    }),
      onDragleave: _cache[1] || (_cache[1] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($setup.onDragLeave && $setup.onDragLeave.apply($setup, args));
    }),
      onDrop: _cache[2] || (_cache[2] = function ($event) { return ($setup.onDrop($event, 0, true)); })
    }, [
      (_ctx.editable)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$j, [
            (_ctx.editable)
              ? (vue.openBlock(), vue.createBlock(_component_editor_box, {
                  key: 0,
                  label: 'column',
                  onCallAction: $setup.callAction
                }, null, 8, ["onCallAction"]))
              : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.widgets, function (widget, widgetIndex) {
              return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: widgetIndex }, [
                (widget && widget.options && widget.options.intersection)
                  ? (vue.openBlock(), vue.createBlock(_component_q_intersection, {
                      key: 0,
                      transition: widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'
                    }, {
                      default: vue.withCtx(function () { return [
                        vue.createVNode(_component_page_builder_widget, {
                          widget: $setup.computedWidget[widgetIndex],
                          "onUpdate:widget": function ($event) { return (($setup.computedWidget[widgetIndex]) = $event); },
                          options: widget.options,
                          "onUpdate:options": function ($event) { return ((widget.options) = $event); },
                          editable: _ctx.editable,
                          draggable: _ctx.editable,
                          onOnOptionAction: function ($event) { return ($setup.onOptionAction($event, {widget: widget, widgetIndex: widgetIndex, name: widget.name})); },
                          onDragstart: function ($event) { return ($setup.onDragStart($event, widget, widgetIndex)); },
                          onDragover: $setup.onDragOver,
                          onDragleave: $setup.onDragLeave,
                          onDrop: function ($event) { return ($setup.onDrop($event, widgetIndex)); }
                        }, null, 8, ["widget", "onUpdate:widget", "options", "onUpdate:options", "editable", "draggable", "onOnOptionAction", "onDragstart", "onDragover", "onDragleave", "onDrop"])
                      ]; }),
                      _: 2
                    }, 1032, ["transition"]))
                  : (vue.openBlock(), vue.createBlock(_component_page_builder_widget, {
                      key: 1,
                      widget: $setup.computedWidget[widgetIndex],
                      "onUpdate:widget": function ($event) { return (($setup.computedWidget[widgetIndex]) = $event); },
                      options: widget.options,
                      "onUpdate:options": function ($event) { return ((widget.options) = $event); },
                      editable: _ctx.editable,
                      draggable: _ctx.editable,
                      onOnOptionAction: function ($event) { return ($setup.onOptionAction($event, {widget: widget, widgetIndex: widgetIndex, name: widget.name})); },
                      onDragstart: function ($event) { return ($setup.onDragStart($event, widget, widgetIndex)); },
                      onDragover: $setup.onDragOver,
                      onDragleave: $setup.onDragLeave,
                      onDrop: function ($event) { return ($setup.onDrop($event, widgetIndex)); }
                    }, null, 8, ["widget", "onUpdate:widget", "options", "onUpdate:options", "editable", "draggable", "onOnOptionAction", "onDragstart", "onDragover", "onDragleave", "onDrop"]))
              ], 64))
            }), 128))
          ]))
        : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList($props.widgets, function (widget, widgetIndex) {
            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: widgetIndex }, [
              (widget && widget.options && widget.options.intersection)
                ? (vue.openBlock(), vue.createBlock(_component_q_intersection, {
                    key: 0,
                    transition: widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'
                  }, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_page_builder_widget, {
                        widget: $setup.computedWidget[widgetIndex],
                        "onUpdate:widget": function ($event) { return (($setup.computedWidget[widgetIndex]) = $event); },
                        options: widget.options,
                        "onUpdate:options": function ($event) { return ((widget.options) = $event); },
                        editable: _ctx.editable,
                        draggable: _ctx.editable,
                        onOnOptionAction: function ($event) { return ($setup.onOptionAction($event, {widget: widget, widgetIndex: widgetIndex, name: widget.name})); },
                        onDragstart: function ($event) { return ($setup.onDragStart($event, widget, widgetIndex)); },
                        onDragover: $setup.onDragOver,
                        onDragleave: $setup.onDragLeave,
                        onDrop: function ($event) { return ($setup.onDrop($event, widgetIndex)); }
                      }, null, 8, ["widget", "onUpdate:widget", "options", "onUpdate:options", "editable", "draggable", "onOnOptionAction", "onDragstart", "onDragover", "onDragleave", "onDrop"])
                    ]; }),
                    _: 2
                  }, 1032, ["transition"]))
                : (vue.openBlock(), vue.createBlock(_component_page_builder_widget, {
                    key: 1,
                    widget: $setup.computedWidget[widgetIndex],
                    "onUpdate:widget": function ($event) { return (($setup.computedWidget[widgetIndex]) = $event); },
                    options: widget.options,
                    "onUpdate:options": function ($event) { return ((widget.options) = $event); },
                    editable: _ctx.editable,
                    draggable: _ctx.editable,
                    onOnOptionAction: function ($event) { return ($setup.onOptionAction($event, {widget: widget, widgetIndex: widgetIndex, name: widget.name})); },
                    onDragstart: function ($event) { return ($setup.onDragStart($event, widget, widgetIndex)); },
                    onDragover: $setup.onDragOver,
                    onDragleave: $setup.onDragLeave,
                    onDrop: function ($event) { return ($setup.onDrop($event, widgetIndex)); }
                  }, null, 8, ["widget", "onUpdate:widget", "options", "onUpdate:options", "editable", "draggable", "onOnOptionAction", "onDragstart", "onDragover", "onDragleave", "onDrop"]))
            ], 64))
          }), 128))
    ], 38))
  }

  __default__$2.render = render$n;
  __default__$2.__scopeId = "data-v-f13f721a";

  var defaultOptions$1 = {
    className: '',
    height: 'auto',
    boxed: false,
    boxedWidth: 1200,
    paddingOfBoxedInFullWidth: '30px',
    responsiveBoxedWidth: false,
    responsiveBoxedWidths: {
      xs: {
        width: '360px'
      },
      sm: {
        width: '599px'
      },
      md: {
        width: '1023px'
      },
      lg: {
        width: '1439px'
      },
      xl: {
        width: '1919px'
      }
    },
    gutterXSize: null,
    gutterYSize: null,
    absolute: 'none',
    backgrounds: {
      xs: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      sm: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      md: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      lg: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      xl: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      }
    },
    responsiveSpacing: {
      xs: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      sm: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      md: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      lg: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      xl: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      }
    },
    boxShadows: [],
    borderStyle: {
      borderCssString: '',
      borderRadiusCssString: ''
    },
    cssHoverEffects: {
      boxShadows: [],
      borderStyle: {
        borderCssString: '',
        borderRadiusCssString: ''
      },
      transition: {
        time: 0
      },
      transform: {
        rotate: null,
        scaleX: null,
        scaleY: null,
        skewX: null,
        skewY: null,
        translateX: null,
        translateY: null
      }
    },
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
    alignment: {
      justifyContent: {
        global: null,
        xl: null,
        lg: null,
        md: null,
        sm: null,
        xs: null
      },
      alignItems: {
        global: null,
        xl: null,
        lg: null,
        md: null,
        sm: null,
        xs: null
      },
      alignContent: {
        global: null,
        xl: null,
        lg: null,
        md: null,
        sm: null,
        xs: null
      }
    },
    style: {}
  };

  var __default__$1 = {
    name: 'PageBuilderRow',
    components: {
      PageBuilderCol: __default__$2,
      EditorBox: script$n
    },
    mixins: [mixinWidget],
    props: {
      cols: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    emits: ['onOptionAction', 'update:options', 'update:cols', 'onDrag'],
    data: function data() {
      return {
        localDraggable: null,
        deviceWidth: 1920,
        boxedInFullWidthStatus: false,
        form: {},
        action: '',
        eventCol: {},
        alignmentOptions: {
          justifyContent: {
            global: [
              null,
              'justify-start',
              'justify-center',
              'justify-end',
              'justify-between',
              'justify-around',
              'justify-evenly'
            ],
            xl: [
              null,
              'justify-xl-start',
              'justify-xl-center',
              'justify-xl-end',
              'justify-xl-between',
              'justify-xl-around',
              'justify-xl-evenly'
            ],
            lg: [
              null,
              'justify-lg-start',
              'justify-lg-center',
              'justify-lg-end',
              'justify-lg-between',
              'justify-lg-around',
              'justify-lg-evenly'
            ],
            md: [
              null,
              'justify-md-start',
              'justify-md-center',
              'justify-md-end',
              'justify-md-between',
              'justify-md-around',
              'justify-md-evenly'
            ],
            sm: [
              null,
              'justify-sm-start',
              'justify-sm-center',
              'justify-sm-end',
              'justify-sm-between',
              'justify-sm-around',
              'justify-sm-evenly'
            ],
            xs: [
              null,
              'justify-xs-start',
              'justify-xs-center',
              'justify-xs-end',
              'justify-xs-between',
              'justify-xs-around',
              'justify-xs-evenly'
            ]
          },
          alignItems: {
            global: [
              null,
              'items-start',
              'items-center',
              'items-end',
              'items-baseline',
              'items-stretch'
            ],
            xl: [
              null,
              'items-xl-start',
              'items-xl-center',
              'items-xl-end',
              'items-xl-baseline',
              'items-xl-stretch'
            ],
            lg: [
              null,
              'items-lg-start',
              'items-lg-center',
              'items-lg-end',
              'items-lg-baseline',
              'items-lg-stretch'
            ],
            md: [
              null,
              'items-md-start',
              'items-md-center',
              'items-md-end',
              'items-md-baseline',
              'items-md-stretch'
            ],
            sm: [
              null,
              'items-sm-start',
              'items-sm-center',
              'items-sm-end',
              'items-sm-baseline',
              'items-sm-stretch'
            ],
            xs: [
              null,
              'items-xs-start',
              'items-xs-center',
              'items-xs-end',
              'items-xs-baseline',
              'items-xs-stretch'
            ]
          },
          alignContent: {
            global: [
              null,
              'content-start',
              'content-center',
              'content-end',
              'content-between',
              'content-around',
              'content-stretch'
            ],
            xl: [
              null,
              'content-xl-start',
              'content-xl-center',
              'content-xl-end',
              'content-xl-between',
              'content-xl-around',
              'content-xl-stretch'
            ],
            lg: [
              null,
              'content-lg-start',
              'content-lg-center',
              'content-lg-end',
              'content-lg-between',
              'content-lg-around',
              'content-lg-stretch'
            ],
            md: [
              null,
              'content-md-start',
              'content-md-center',
              'content-md-end',
              'content-md-between',
              'content-md-around',
              'content-md-stretch'
            ],
            sm: [
              null,
              'content-sm-start',
              'content-sm-center',
              'content-sm-end',
              'content-sm-between',
              'content-sm-around',
              'content-sm-stretch'
            ],
            xs: [
              null,
              'content-xs-start',
              'content-xs-center',
              'content-xs-end',
              'content-xs-between',
              'content-xs-around',
              'content-xs-stretch'
            ]
          }
        },
        elementFormDialog: false,
        rowElementClass: 'row',
        defaultOptions: JSON.parse(JSON.stringify(defaultOptions$1))
      }
    },
    computed: {
      responsiveShow: function responsiveShow () {
        var this$1$1 = this;

        var responsiveShow = '';
        Object.keys(this.rowOptions.responsiveShow).forEach(function (key) {
          if (this$1$1.rowOptions.responsiveShow[key] === false) {
            responsiveShow += key + '-hide ';
          }
        });

        return ' ' + responsiveShow
      },
      shadows: function shadows () {
        var shadows = [];
        this.rowOptions.boxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      hoverShadows: function hoverShadows () {
        var shadows = [];
        this.rowOptions.cssHoverEffects.boxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      rowOptions: {
        get: function get() {
          return Object.assign(this.defaultOptions, this.options)
        },
        set: function set(newValue) {
          this.$emit('update:options', newValue);
        }
      },
      rowClassName: function rowClassName () {
        var responsiveBoxedWidth = this.rowOptions.responsiveBoxedWidth ? ' responsiveBoxedWidth ' : '';
        return this.rowOptions.className + this.responsiveShow + responsiveBoxedWidth
      },
      computedCol: {
        get: function get () {
          return this.cols
        },
        set: function set (value) {
          this.$emit('update:cols', value);
        }
      }
    },
    watch: {
      rowOptions: {
        handler: function handler() {
          this.updateClassName();
          this.updateBoxedStyle();
        },
        deep: true
        // immediate: true
      },
      editable: {
        handler: function handler() {
          this.updateClassName();
        }
        // immediate: true
      },
      boxedInFullWidthStatus: {
        handler: function handler() {
          this.updateClassName();
        }
        // immediate: true
      }
    },
    created: function created() {
      this.updateClassName();
    },
    mounted: function mounted() {
      var this$1$1 = this;

      this.updateBoxedStyle();
      window.addEventListener('resize', function () {
        this$1$1.updateBoxedStyle();
      });
    },
    methods: {
      getAlignmentClasses: function getAlignmentClasses () {
        var geClassItem = function (classItem) {
          return (classItem ? classItem + ' ' : '')
        };
        var getResponsiveClasses = function (object) {
          return geClassItem(object.global) +
              geClassItem(object.xl) +
              geClassItem(object.lg) +
              geClassItem(object.md) +
              geClassItem(object.sm) +
              geClassItem(object.xs)
        };
        return ' ' + getResponsiveClasses(this.rowOptions.alignment.justifyContent) +
            getResponsiveClasses(this.rowOptions.alignment.alignItems) +
            getResponsiveClasses(this.rowOptions.alignment.alignContent)
      },
      getRemoveAlignmentClasses: function getRemoveAlignmentClasses (classNames) {
        var result = classNames;
        var removeByObject = function (object) {
          var removeArray = function (array) {
            array.forEach(function (item) {
              if (item) {
                result = result.replaceAll(item, '');
              }
            });
          };
          removeArray(object.global);
          removeArray(object.xl);
          removeArray(object.lg);
          removeArray(object.md);
          removeArray(object.sm);
          removeArray(object.xs);
        };
        removeByObject(this.alignmentOptions.justifyContent);
        removeByObject(this.alignmentOptions.alignItems);
        removeByObject(this.alignmentOptions.alignContent);

        return result
      },
      updateClassName: function updateClassName () {
        var newClassName = this.rowOptions.className;
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'editable', this.editable);
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'boxed rtl-fixed-for-boxed', this.rowOptions.boxed);
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'boxedInFullWidthStatus', this.boxedInFullWidthStatus);
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-top', this.rowOptions.absolute === 'top');
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-right', this.rowOptions.absolute === 'right');
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-bottom', this.rowOptions.absolute === 'bottom');
        newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-left', this.rowOptions.absolute === 'left');
        this.rowElementClass = this.rowElementClass.replace(/q-col-gutter-([xy])-(xs|sm|md|lg|xl)/gi, '');
        if (this.rowOptions.gutterXSize) {
          this.rowElementClass = this.getUpdateClassNamesWithKey(this.rowElementClass, this.getGutterSize(this.rowOptions.gutterXSize, 'x'), this.rowOptions.gutterXSize);
        }
        if (this.rowOptions.gutterYSize) {
          this.rowElementClass = this.getUpdateClassNamesWithKey(this.rowElementClass, this.getGutterSize(this.rowOptions.gutterYSize, 'y'), this.rowOptions.gutterYSize);
        }

        this.rowElementClass = this.getRemoveAlignmentClasses(this.rowElementClass);
        this.rowElementClass = this.rowElementClass.replaceAll('  ', ' ');
        this.rowElementClass += this.getAlignmentClasses();

        this.rowOptions.className = newClassName;
      },
      getGutterSize: function getGutterSize (size, type) {
        return 'q-col-gutter-' + type + '-' + size
      },
      updateBoxedStyle: function updateBoxedStyle () {
        // pageBuilderRow
        if (!this.rowOptions.boxed || this.rowOptions.responsiveBoxedWidth) {
          this.rowOptions.style.width = null;
          this.rowOptions.style.maxWidth = null;
          this.boxedInFullWidthStatus = false;
          return
        }

        // this.deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 0
        var pageBuilderRowWidth = (this.$refs.pageBuilderRow) ? this.$refs.pageBuilderRow.offsetWidth : 1920;

        this.rowOptions.style.maxWidth = this.rowOptions.boxedWidth + 'px';
        this.rowOptions.style.width = this.rowOptions.boxedWidth + 'px';
        // this.boxedInFullWidthStatus = this.deviceWidth <= (Number(this.rowOptions.boxedWidth) + this.getPaddingOfBoxedInFullWidth())
        this.boxedInFullWidthStatus = pageBuilderRowWidth <= (Number(this.rowOptions.boxedWidth) + this.getPaddingOfBoxedInFullWidth());
      },
      getPaddingOfBoxedInFullWidth: function getPaddingOfBoxedInFullWidth() {
        var padding = this.rowOptions.paddingOfBoxedInFullWidth.split('px');
        if (padding && padding.length > 0) {
          return Number(padding[0])
        } else {
          return 0
        }
      },
      onSubmitElement: function onSubmitElement(widget) {
        var widgetData = widget.item.type === 'widget' ? widget.item : widget.item.info;
        if (widget.item.info !== undefined) {
          widgetData.options = widget.options;
        }
        if (this.action === 'add') {
          this.$props.cols[this.eventCol.colIndex].widgets.push(widgetData);
        } else if (this.action === 'edit') {
          this.$props.cols[this.eventCol.colIndex] = widgetData;
        }
        this.elementFormDialog = false;
      },
      callAction: function callAction(event) {
        var path = {
          node: 'data.rows'
        };
        var data = {
          event: event,
          path: path,
          name: 'row'
        };
        this.$emit('onOptionAction', data);
      },
      onDrag: function onDrag (dragStatus) {
        this.$emit('onDrag', dragStatus);
      },
      onOptionAction: function onOptionAction (data, widgetItem) {
        var event = data.event;
        data.path.index = widgetItem.widgetIndex;
        var path = {
          node: 'data.rows',
          child: data.path
        };
        var emitData = {
          event: event,
          path: path,
          name: data.name,
          nodeName: data.nodeName,
          widget: data.widget ? data.widget : widgetItem.widget,
          widgetIndex: data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
        };
        this.$emit('onOptionAction', emitData);
      },

      onDragStart: function onDragStart (event, widget, widgetIndex) {
        if (!this.editable) {
          return
        }
        event.stopPropagation();
        this.$emit('onDrag', 'DragStart');
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('value', JSON.stringify({ widget: widget, widgetIndex: widgetIndex }));
        this.localDraggable = event;
        // console.log('onDragStart', event.dataTransfer.getData('value'))
      },
      onDragOver: function onDragOver (event) {
        if (!this.editable) {
          return
        }
        event.preventDefault();
        // console.log('onDragOver', event.dataTransfer.getData('value'))
      },
      onDragLeave: function onDragLeave (event) {
        // if (!props.editable) {
        //
        // }
        /*
        ev.target.style.marginTop = '2px'
        ev.target.style.marginBottom = '2px'
        */
        // console.log('onDragLeave', event.dataTransfer.getData('value'))
      },
      // dragEnter(ev) {
      //   /*
      //   if (ev.clientY > ev.target.height / 2) {
      //     ev.target.style.marginBottom = '10px'
      //   } else {
      //     ev.target.style.marginTop = '10px'
      //   }
      //   */
      // },,
      onDrop: function onDrop (event, newIndex, parent) {
        if (!this.editable) {
          return
        }
        var valueStringField = event.dataTransfer.getData('value');
        var value = valueStringField ? JSON.parse(valueStringField) : null;
        var widget = value.widget;
        var widgetOldIndex = value.widgetIndex;
        var widgetNewIndex = newIndex;
        if (this.localDraggable) {
          this.updatePosition(this.computedCol, widgetOldIndex, widgetNewIndex);
        } else {
          this.addToIndex(this.computedCol, widget, widgetNewIndex);
        }

        this.localDraggable = null;
        this.$emit('onDrag', 'Drop');
        event.stopPropagation();
      },
      updatePosition: function updatePosition (list, oldIndex, newIndex) {
        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      },
      addToIndex: function addToIndex (list, newItem, index) {
        if (list.length > index) {
          list.splice(index, 0, newItem);
        } else {
          list.push(newItem);
        }
      },
      removeFromIndex: function removeFromIndex (list, index) {
        list.splice(index, 1);
      }
    }
  };
  var __injectCSSVars__$1 = function () {
  vue.useCssVars(function (_ctx) { return ({
    "c52d71c2": (_ctx.shadows),
    "61c27baa": (_ctx.hoverShadows),
    "5afbfd6e": (_ctx.rowOptions.borderStyle.borderCssString),
    "142ea517": (_ctx.rowOptions.borderStyle.borderRadiusCssString),
    "52d33ea4": (_ctx.rowOptions.cssHoverEffects.borderStyle.borderCssString),
    "04959b9c": (_ctx.rowOptions.cssHoverEffects.borderStyle.borderRadiusCssString),
    "01496b91": (_ctx.rowOptions.cssHoverEffects.transform.skewX),
    "01496b92": (_ctx.rowOptions.cssHoverEffects.transform.skewY),
    "266e0eb8": (_ctx.rowOptions.cssHoverEffects.transform.rotate),
    "277151ab": (_ctx.rowOptions.cssHoverEffects.transform.scaleX),
    "277151ac": (_ctx.rowOptions.cssHoverEffects.transform.scaleY),
    "a5e318b2": (_ctx.rowOptions.cssHoverEffects.transform.translateX),
    "a5e318b0": (_ctx.rowOptions.cssHoverEffects.transform.translateY),
    "2068786a": (_ctx.rowOptions.cssHoverEffects.transition.time),
    "db8c3ce4": (_ctx.defaultOptions.backgrounds.xs.size),
    "97b94114": (_ctx.defaultOptions.backgrounds.xs.color),
    "97124d24": (_ctx.defaultOptions.backgrounds.xs.image),
    "2d540030": (_ctx.defaultOptions.backgrounds.xs.repeat),
    "32710c36": (_ctx.defaultOptions.backgrounds.xs.position),
    "d9f58620": (_ctx.defaultOptions.backgrounds.xs.attachment),
    "7f7da58f": (_ctx.defaultOptions.backgrounds.sm.size),
    "6f581b95": (_ctx.defaultOptions.backgrounds.sm.color),
    "6fab958d": (_ctx.defaultOptions.backgrounds.sm.image),
    "d68e70ae": (_ctx.defaultOptions.backgrounds.sm.repeat),
    "df7e3092": (_ctx.defaultOptions.backgrounds.sm.position),
    "8767879e": (_ctx.defaultOptions.backgrounds.sm.attachment),
    "32bca472": (_ctx.defaultOptions.backgrounds.md.size),
    "23f8f912": (_ctx.defaultOptions.backgrounds.md.color),
    "244c730a": (_ctx.defaultOptions.backgrounds.md.image),
    "743399cc": (_ctx.defaultOptions.backgrounds.md.repeat),
    "7c4fbd1a": (_ctx.defaultOptions.backgrounds.md.position),
    "40097658": (_ctx.defaultOptions.backgrounds.md.attachment),
    "02f4f30e": (_ctx.defaultOptions.backgrounds.lg.size),
    "5aca7df6": (_ctx.defaultOptions.backgrounds.lg.color),
    "5b1df7ee": (_ctx.defaultOptions.backgrounds.lg.image),
    "1792b168": (_ctx.defaultOptions.backgrounds.lg.repeat),
    "77714494": (_ctx.defaultOptions.backgrounds.lg.position),
    "088d2e70": (_ctx.defaultOptions.backgrounds.lg.attachment),
    "f3701596": (_ctx.defaultOptions.backgrounds.xl.size),
    "41d7c0af": (_ctx.defaultOptions.backgrounds.xl.color),
    "422b3aa7": (_ctx.defaultOptions.backgrounds.xl.image),
    "122dc5cf": (_ctx.defaultOptions.backgrounds.xl.repeat),
    "f7221746": (_ctx.defaultOptions.backgrounds.xl.position),
    "5d29b757": (_ctx.defaultOptions.backgrounds.xl.attachment),
    "19c0f2f0": (_ctx.defaultOptions.responsiveSpacing.xs.marginTop),
    "1e59a1cc": (_ctx.defaultOptions.responsiveSpacing.xs.marginLeft),
    "a59e0e12": (_ctx.defaultOptions.responsiveSpacing.xs.marginRight),
    "440982a0": (_ctx.defaultOptions.responsiveSpacing.xs.marginBottom),
    "a382530a": (_ctx.defaultOptions.responsiveSpacing.xs.paddingTop),
    "19982fa1": (_ctx.defaultOptions.responsiveSpacing.xs.paddingLeft),
    "19c425c2": (_ctx.defaultOptions.responsiveSpacing.xs.paddingRight),
    "03cdab45": (_ctx.defaultOptions.responsiveSpacing.xs.paddingBottom),
    "75ec878f": (_ctx.defaultOptions.responsiveSpacing.sm.marginTop),
    "47a0a10d": (_ctx.defaultOptions.responsiveSpacing.sm.marginLeft),
    "a66c3c54": (_ctx.defaultOptions.responsiveSpacing.sm.marginRight),
    "5d011c9e": (_ctx.defaultOptions.responsiveSpacing.sm.marginBottom),
    "50f45488": (_ctx.defaultOptions.responsiveSpacing.sm.paddingTop),
    "19311880": (_ctx.defaultOptions.responsiveSpacing.sm.paddingLeft),
    "0d4858c3": (_ctx.defaultOptions.responsiveSpacing.sm.paddingRight),
    "fe604f38": (_ctx.defaultOptions.responsiveSpacing.sm.paddingBottom),
    "0bb85e8c": (_ctx.defaultOptions.responsiveSpacing.md.marginTop),
    "6b4fa9b0": (_ctx.defaultOptions.responsiveSpacing.md.marginLeft),
    "020824da": (_ctx.defaultOptions.responsiveSpacing.md.marginRight),
    "74e244d8": (_ctx.defaultOptions.responsiveSpacing.md.marginBottom),
    "09964342": (_ctx.defaultOptions.responsiveSpacing.md.paddingTop),
    "6b63243d": (_ctx.defaultOptions.responsiveSpacing.md.paddingLeft),
    "0157c4a6": (_ctx.defaultOptions.responsiveSpacing.md.paddingRight),
    "0eade8e1": (_ctx.defaultOptions.responsiveSpacing.md.paddingBottom),
    "7a965d20": (_ctx.defaultOptions.responsiveSpacing.lg.marginTop),
    "d83cd968": (_ctx.defaultOptions.responsiveSpacing.lg.marginLeft),
    "2eb19112": (_ctx.defaultOptions.responsiveSpacing.lg.marginRight),
    "114cd030": (_ctx.defaultOptions.responsiveSpacing.lg.marginBottom),
    "23c6c7fb": (_ctx.defaultOptions.responsiveSpacing.lg.paddingTop),
    "550e6e21": (_ctx.defaultOptions.responsiveSpacing.lg.paddingLeft),
    "4d15b742": (_ctx.defaultOptions.responsiveSpacing.lg.paddingRight),
    "3aae49c5": (_ctx.defaultOptions.responsiveSpacing.lg.paddingBottom),
    "07800fa9": (_ctx.defaultOptions.responsiveSpacing.xl.marginTop),
    "2f03c79a": (_ctx.defaultOptions.responsiveSpacing.xl.marginLeft),
    "279bcb70": (_ctx.defaultOptions.responsiveSpacing.xl.marginRight),
    "9e2a8952": (_ctx.defaultOptions.responsiveSpacing.xl.marginBottom),
    "786350e2": (_ctx.defaultOptions.responsiveSpacing.xl.paddingTop),
    "d7f9fbcc": (_ctx.defaultOptions.responsiveSpacing.xl.paddingLeft),
    "2698bb2e": (_ctx.defaultOptions.responsiveSpacing.xl.paddingRight),
    "e2647904": (_ctx.defaultOptions.responsiveSpacing.xl.paddingBottom),
    "64e0ba0a": (_ctx.defaultOptions.responsiveBoxedWidths.xs.width),
    "ee7741cc": (_ctx.defaultOptions.responsiveBoxedWidths.sm.width),
    "3d653c97": (_ctx.defaultOptions.responsiveBoxedWidths.md.width),
    "7436c17b": (_ctx.defaultOptions.responsiveBoxedWidths.lg.width),
    "5b440434": (_ctx.defaultOptions.responsiveBoxedWidths.xl.width),
    "d6ef934c": (_ctx.rowOptions.paddingOfBoxedInFullWidth)
  }); });};
  var __setup__$1 = __default__$1.setup;
  __default__$1.setup = __setup__$1
    ? function (props, ctx) { __injectCSSVars__$1();return __setup__$1(props, ctx) }
    : __injectCSSVars__$1;

  var _hoisted_1$i = ["id"];

  function render$m(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_editor_box = vue.resolveComponent("editor-box");
    var _component_page_builder_col = vue.resolveComponent("page-builder-col");

    return (vue.openBlock(), vue.createElementBlock("div", {
      ref: "pageBuilderRow",
      class: vue.normalizeClass(["page-builder-row", $options.rowClassName]),
      style: vue.normalizeStyle($options.rowOptions.style),
      onDragover: _cache[0] || (_cache[0] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($options.onDragOver && $options.onDragOver.apply($options, args));
    }),
      onDragleave: _cache[1] || (_cache[1] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($options.onDragLeave && $options.onDragLeave.apply($options, args));
    }),
      onDrop: _cache[2] || (_cache[2] = function ($event) { return ($options.onDrop($event, 0, true)); })
    }, [
      (_ctx.editable)
        ? (vue.openBlock(), vue.createBlock(_component_editor_box, {
            key: 0,
            label: 'row',
            onCallAction: $options.callAction
          }, null, 8, ["onCallAction"]))
        : vue.createCommentVNode("", true),
      vue.createElementVNode("div", {
        id: $options.rowOptions.id,
        class: vue.normalizeClass($data.rowElementClass)
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.cols, function (col, colIndex) {
          return (vue.openBlock(), vue.createBlock(_component_page_builder_col, {
            key: 'colIndex'+colIndex,
            options: col.options,
            "onUpdate:options": function ($event) { return ((col.options) = $event); },
            widgets: col.widgets,
            "onUpdate:widgets": function ($event) { return ((col.widgets) = $event); },
            editable: _ctx.editable,
            "drag-status": _ctx.dragStatus,
            draggable: _ctx.editable,
            onOnOptionAction: function ($event) { return ($options.onOptionAction($event, {widget: col, widgetIndex: colIndex, name: 'col'})); },
            onOnDrag: $options.onDrag,
            onDragstart: function ($event) { return ($options.onDragStart($event, col, colIndex)); },
            onDragover: $options.onDragOver,
            onDragleave: $options.onDragLeave,
            onDrop: function ($event) { return ($options.onDrop($event, colIndex)); }
          }, null, 8, ["options", "onUpdate:options", "widgets", "onUpdate:widgets", "editable", "drag-status", "draggable", "onOnOptionAction", "onOnDrag", "onDragstart", "onDragover", "onDragleave", "onDrop"]))
        }), 128))
      ], 10, _hoisted_1$i)
    ], 38))
  }

  __default__$1.render = render$m;
  __default__$1.__scopeId = "data-v-1bae3518";

  var defaultOptions = {
    fullHeight: false,
    className: '',
    backgrounds: {
      xs: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      sm: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      md: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      lg: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      },
      xl: {
        size: null,
        color: null,
        image: null,
        repeat: null,
        position: null,
        attachment: null
      }
    },
    responsiveSpacing: {
      xs: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      sm: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      md: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      lg: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      xl: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      }
    },
    style: {},
    boxShadows: [],
    borderStyle: {
      borderCssString: '',
      borderRadiusCssString: ''
    },
    cssHoverEffects: {
      boxShadows: [],
      borderStyle: {
        borderCssString: '',
        borderRadiusCssString: ''
      },
      transition: {
        time: 0
      },
      transform: {
        rotate: null,
        scaleX: null,
        scaleY: null,
        skewX: null,
        skewY: null,
        translateX: null,
        translateY: null
      }
    },
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    }
  };

  var __default__ = {
    name: 'PageBuilderSection',
    components: {
      EditorBox: script$n,
      PageBuilderRow: __default__$1
    },
    mixins: [mixinWidget],
    emits: ['onOptionAction', 'update:options', 'onDrag'],
    data: function data() {
      return {
        defaultBackground: null,
        eventRow: {},
        action: '',
        form: {},
        backgrounds: {
          xs: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          sm: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          md: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          lg: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          }
        },
        elementFormDialog: false,
        windowSize: {
          x: 0,
          y: 0
        },
        defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
      }
    },
    computed: {
      responsiveShow: function responsiveShow () {
        var this$1$1 = this;

        var responsiveShow = '';
        Object.keys(this.sectionOptions.responsiveShow).forEach(function (key) {
          if (this$1$1.sectionOptions.responsiveShow[key] === false) {
            responsiveShow += key + '-hide ';
          }
        });

        return ' ' + responsiveShow
      },
      shadows: function shadows() {
        var shadows = [];
        this.sectionOptions.boxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      hoverShadows: function hoverShadows() {
        var shadows = [];
        this.sectionOptions.cssHoverEffects.boxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      sectionOptions: {
        get: function get() {
          return Object.assign(this.defaultOptions, this.options)
        },
        set: function set(newValue) {
          this.$emit('update:options', newValue);
        }
      },
      sectionClassName: function sectionClassName () {
        return this.optionsClassName + this.responsiveShow
      },
      optionsClassName: function optionsClassName () {
        return this.sectionOptions.className
      },
      optionsFullHeight: function optionsFullHeight () {
        return this.sectionOptions.fullHeight
      },
      optionsVerticalAlign: function optionsVerticalAlign () {
        return this.sectionOptions.verticalAlign
      },
      containerFullHeight: {
        get: function get() {
          // if (!this.sectionOptions?.fullHeight) {
          if (!this.sectionOptions || !this.sectionOptions.fullHeight) {
            return false
          }
          if (this.sectionOptions.fullHeight === true) {
            return '100vh'
          }

          return this.sectionOptions.fullHeight
        },
        set: function set(newValue) {
          this.sectionOptions.fullHeight = newValue;
        }
      },
      windowWidth: function windowWidth() {
        return this.windowSize.x
      },
      windowHeight: function windowHeight() {
        return this.windowSize.y
      }
    },
    watch: {
      editable: {
        handler: function handler() {
          this.computeOptionsClassName();
        },
        immediate: true
      },
      optionsClassName: {
        handler: function handler() {
          this.computeOptionsClassName();
        },
        immediate: true
      },
      optionsFullHeight: {
        handler: function handler() {
          this.computeOptionsClassName();
        },
        immediate: true
      },
      optionsVerticalAlign: {
        handler: function handler() {
          this.computeOptionsClassName();
        },
        immediate: true
      },
      windowWidth: function windowWidth() {
        this.setFullHeight();
      },
      windowHeight: function windowHeight() {
        this.setFullHeight();
      },
      containerFullHeight: function containerFullHeight() {
        this.setFullHeight();
      }
    },
    created: function created() {
      this.setFullHeight();
    },
    methods: {
      computeOptionsClassName: function computeOptionsClassName () {
        var this$1$1 = this;

        this.$nextTick(function () {
          this$1$1.sectionOptions.className = this$1$1.getUpdateClassNamesWithKey(this$1$1.sectionOptions.className, 'editable', this$1$1.editable);
          this$1$1.sectionOptions.className = this$1$1.getUpdateClassNamesWithKey(
            this$1$1.sectionOptions.className, 'vertical-align-center',
            !!this$1$1.sectionOptions.fullHeight && this$1$1.sectionOptions.verticalAlign === 'center'
          );
          this$1$1.sectionOptions.className = this$1$1.getUpdateClassNamesWithKey(
            this$1$1.sectionOptions.className, 'vertical-align-start',
            !!this$1$1.sectionOptions.fullHeight && this$1$1.sectionOptions.verticalAlign === 'start'
          );
          this$1$1.sectionOptions.className = this$1$1.getUpdateClassNamesWithKey(
            this$1$1.sectionOptions.className, 'vertical-align-end',
            !!this$1$1.sectionOptions.fullHeight && this$1$1.sectionOptions.verticalAlign === 'end'
          );
        });
      },
      Resize: function Resize(newVal) {
        this.windowSize.x = newVal.width;
        this.windowSize.y = newVal.height;
      },
      setFullHeight: function setFullHeight() {
        if (this.containerFullHeight === true) {
          this.sectionOptions.style.minHeight = '100vh';
        } else if (this.containerFullHeight !== false) {
          this.sectionOptions.style.minHeight = this.containerFullHeight;
        } else {
          this.sectionOptions.style.minHeight = 'auto';
        }
      },
      callAction: function callAction(event) {
        var path = {
          node: 'widgets'
        };
        var data = {
          event: event,
          name: 'section',
          path: path
        };

        this.$emit('onOptionAction', data);
      },
      onDrag: function onDrag (dragStatus) {
        this.$emit('onDrag', dragStatus);
      },
      onOptionAction: function onOptionAction(data, widgetItem) {
        var event = data.event;
        data.path.index = widgetItem.widgetIndex;
        var path = {
          node: 'widgets',
          child: data.path
        };
        var emitData = {
          event: event,
          path: path,
          name: data.name,
          nodeName: data.nodeName,
          widget: data.widget ? data.widget : widgetItem.widget,
          widgetIndex: data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
        };
        this.$emit('onOptionAction', emitData);
      },
      onSubmitElement: function onSubmitElement(widget) {
        var widgetData = widget.item.info;
        if (widget.item.info !== undefined) {
          widgetData.options = widget.options;
        }
        if (this.action === 'add') {
          this.$props.data.rows[this.eventRow.rowIndex].cols.push(widgetData);
        } else if (this.action === 'edit') {
          widgetData = widget.item;
          this.$props.data.rows[this.eventRow.rowIndex] = widgetData;
        }
        this.elementFormDialog = false;
      },
      setRow: function setRow(event, rowItem) {
        this.action = event;
        this.eventRow = {
          rowIndex: rowItem.rowIndex,
          row: rowItem.row
        };
        if (event === 'add') {
          this.elementFormDialog = true;
        } else if (event === 'edit') {
          this.form = this.eventRow.row;
          this.form.type = 'row';
          this.elementFormDialog = true;
        } else ;
      }
    }
  };
  var __injectCSSVars__ = function () {
  vue.useCssVars(function (_ctx) { return ({
    "3f86ffa5": (_ctx.shadows),
    "51052536": (_ctx.hoverShadows),
    "68cfd818": (_ctx.sectionOptions.borderStyle.borderCssString),
    "386de4a6": (_ctx.sectionOptions.borderStyle.borderRadiusCssString),
    "2fe0d11a": (_ctx.sectionOptions.cssHoverEffects.borderStyle.borderCssString),
    "bf0d187e": (_ctx.sectionOptions.cssHoverEffects.borderStyle.borderRadiusCssString),
    "7c2142e0": (_ctx.sectionOptions.cssHoverEffects.transform.skewX),
    "7c2142e1": (_ctx.sectionOptions.cssHoverEffects.transform.skewY),
    "06912149": (_ctx.sectionOptions.cssHoverEffects.transform.rotate),
    "0794643c": (_ctx.sectionOptions.cssHoverEffects.transform.scaleX),
    "0794643d": (_ctx.sectionOptions.cssHoverEffects.transform.scaleY),
    "6d585490": (_ctx.sectionOptions.cssHoverEffects.transform.translateX),
    "6d58548e": (_ctx.sectionOptions.cssHoverEffects.transform.translateY),
    "6aa39b1a": (_ctx.sectionOptions.cssHoverEffects.transition.time),
    "5e99f570": (_ctx.defaultOptions.backgrounds.xs.size),
    "44ceb2fc": (_ctx.defaultOptions.backgrounds.xs.color),
    "45222cf4": (_ctx.defaultOptions.backgrounds.xs.image),
    "6e151d22": (_ctx.defaultOptions.backgrounds.xs.repeat),
    "f8447a20": (_ctx.defaultOptions.backgrounds.xs.position),
    "3c1f2d2a": (_ctx.defaultOptions.backgrounds.xs.attachment),
    "84126d6e": (_ctx.defaultOptions.backgrounds.sm.size),
    "00036f1b": (_ctx.defaultOptions.backgrounds.sm.color),
    "0056e913": (_ctx.defaultOptions.backgrounds.sm.image),
    "1977e4e3": (_ctx.defaultOptions.backgrounds.sm.repeat),
    "3ca4c31e": (_ctx.defaultOptions.backgrounds.sm.position),
    "65662c6b": (_ctx.defaultOptions.backgrounds.sm.attachment),
    "7135c82c": (_ctx.defaultOptions.backgrounds.md.size),
    "96b766d0": (_ctx.defaultOptions.backgrounds.md.color),
    "961072e0": (_ctx.defaultOptions.backgrounds.md.image),
    "0e1a91f4": (_ctx.defaultOptions.backgrounds.md.repeat),
    "64871858": (_ctx.defaultOptions.backgrounds.md.position),
    "edd595e4": (_ctx.defaultOptions.backgrounds.md.attachment),
    "416e16c8": (_ctx.defaultOptions.backgrounds.lg.size),
    "29145d08": (_ctx.defaultOptions.backgrounds.lg.color),
    "286d6918": (_ctx.defaultOptions.backgrounds.lg.image),
    "c75c62bc": (_ctx.defaultOptions.backgrounds.lg.repeat),
    "15b41470": (_ctx.defaultOptions.backgrounds.lg.position),
    "9cb1c2ac": (_ctx.defaultOptions.backgrounds.lg.attachment),
    "767dce22": (_ctx.defaultOptions.backgrounds.xl.size),
    "5af9d796": (_ctx.defaultOptions.backgrounds.xl.color),
    "5a52e3a6": (_ctx.defaultOptions.backgrounds.xl.image),
    "d22639ee": (_ctx.defaultOptions.backgrounds.xl.repeat),
    "5448a9d2": (_ctx.defaultOptions.backgrounds.xl.position),
    "0643a791": (_ctx.defaultOptions.backgrounds.xl.attachment),
    "265616f6": (_ctx.defaultOptions.responsiveSpacing.xs.marginTop),
    "b72e02f4": (_ctx.defaultOptions.responsiveSpacing.xs.marginLeft),
    "2de59906": (_ctx.defaultOptions.responsiveSpacing.xs.marginRight),
    "1da654ea": (_ctx.defaultOptions.responsiveSpacing.xs.marginBottom),
    "344e3335": (_ctx.defaultOptions.responsiveSpacing.xs.paddingTop),
    "55746a27": (_ctx.defaultOptions.responsiveSpacing.xs.paddingLeft),
    "596f3bfc": (_ctx.defaultOptions.responsiveSpacing.xs.paddingRight),
    "8cf5476a": (_ctx.defaultOptions.responsiveSpacing.xs.paddingBottom),
    "fafca8d6": (_ctx.defaultOptions.responsiveSpacing.sm.marginTop),
    "64a00472": (_ctx.defaultOptions.responsiveSpacing.sm.marginLeft),
    "2eb3c748": (_ctx.defaultOptions.responsiveSpacing.sm.marginRight),
    "112a87eb": (_ctx.defaultOptions.responsiveSpacing.sm.marginBottom),
    "5d953276": (_ctx.defaultOptions.responsiveSpacing.sm.paddingTop),
    "550d5306": (_ctx.defaultOptions.responsiveSpacing.sm.paddingLeft),
    "4cf36efd": (_ctx.defaultOptions.responsiveSpacing.sm.paddingRight),
    "3687896a": (_ctx.defaultOptions.responsiveSpacing.sm.paddingBottom),
    "184d8292": (_ctx.defaultOptions.responsiveSpacing.md.marginTop),
    "1d41f32c": (_ctx.defaultOptions.responsiveSpacing.md.marginLeft),
    "3ad82819": (_ctx.defaultOptions.responsiveSpacing.md.marginRight),
    "0539f3ce": (_ctx.defaultOptions.responsiveSpacing.md.marginBottom),
    "fd7789ce": (_ctx.defaultOptions.responsiveSpacing.md.paddingTop),
    "b181427a": (_ctx.defaultOptions.responsiveSpacing.md.paddingLeft),
    "4102dae0": (_ctx.defaultOptions.responsiveSpacing.md.paddingRight),
    "7734cc32": (_ctx.defaultOptions.responsiveSpacing.md.paddingBottom),
    "616c1514": (_ctx.defaultOptions.responsiveSpacing.lg.marginTop),
    "19f0f006": (_ctx.defaultOptions.responsiveSpacing.lg.marginLeft),
    "248371fd": (_ctx.defaultOptions.responsiveSpacing.lg.marginRight),
    "50f7e66a": (_ctx.defaultOptions.responsiveSpacing.lg.marginBottom),
    "ac53b696": (_ctx.defaultOptions.responsiveSpacing.lg.paddingTop),
    "de2aaeb2": (_ctx.defaultOptions.responsiveSpacing.lg.paddingLeft),
    "e67e6508": (_ctx.defaultOptions.responsiveSpacing.lg.paddingRight),
    "1f340a6a": (_ctx.defaultOptions.responsiveSpacing.lg.paddingBottom),
    "141533af": (_ctx.defaultOptions.responsiveSpacing.xl.marginTop),
    "6e8d78ed": (_ctx.defaultOptions.responsiveSpacing.xl.marginLeft),
    "637805f6": (_ctx.defaultOptions.responsiveSpacing.xl.marginRight),
    "1ed45cde": (_ctx.defaultOptions.responsiveSpacing.xl.marginBottom),
    "031aa4c8": (_ctx.defaultOptions.responsiveSpacing.xl.paddingTop),
    "604186c0": (_ctx.defaultOptions.responsiveSpacing.xl.paddingLeft),
    "2c5eb8a3": (_ctx.defaultOptions.responsiveSpacing.xl.paddingRight),
    "44857484": (_ctx.defaultOptions.responsiveSpacing.xl.paddingBottom)
  }); });};
  var __setup__ = __default__.setup;
  __default__.setup = __setup__
    ? function (props, ctx) { __injectCSSVars__();return __setup__(props, ctx) }
    : __injectCSSVars__;

  var script$l = __default__;

  var _hoisted_1$h = ["id"];

  function render$l(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_editor_box = vue.resolveComponent("editor-box");
    var _component_q_resize_observer = vue.resolveComponent("q-resize-observer");
    var _component_page_builder_row = vue.resolveComponent("page-builder-row");

    return (vue.openBlock(), vue.createElementBlock("div", {
      id: $options.sectionOptions.id,
      class: vue.normalizeClass(["page-builder-section", $options.sectionClassName]),
      style: vue.normalizeStyle($options.sectionOptions.style)
    }, [
      (_ctx.editable)
        ? (vue.openBlock(), vue.createBlock(_component_editor_box, {
            key: 0,
            label: 'section',
            onCallAction: $options.callAction
          }, null, 8, ["onCallAction"]))
        : vue.createCommentVNode("", true),
      vue.createVNode(_component_q_resize_observer, { onResize: $options.Resize }, null, 8, ["onResize"]),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data.rows, function (row, rowIndex) {
        return (vue.openBlock(), vue.createBlock(_component_page_builder_row, {
          key: rowIndex,
          cols: row.cols,
          "onUpdate:cols": function ($event) { return ((row.cols) = $event); },
          options: row.options,
          "onUpdate:options": function ($event) { return ((row.options) = $event); },
          editable: _ctx.editable,
          "drag-status": _ctx.dragStatus,
          onOnOptionAction: function ($event) { return ($options.onOptionAction($event, {widget: row, widgetIndex: rowIndex, name: 'row'})); },
          onOnDrag: $options.onDrag
        }, null, 8, ["cols", "onUpdate:cols", "options", "onUpdate:options", "editable", "drag-status", "onOnOptionAction", "onOnDrag"]))
      }), 128))
    ], 14, _hoisted_1$h))
  }

  script$l.render = render$l;
  script$l.__scopeId = "data-v-1b6a8c3d";

  var Section = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: script$l
  });

  function r(t,r,e,n){return (r=r.split?r.split("."):r.slice(0)).slice(0,-1).reduce(function(t,r){return /^(__proto__|constructor|prototype)$/.test(r)?{}:t[r]=t[r]||{}},t)[r.pop()]=e,t}

  var script$k = {
    name: 'WidgetListCategory',
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    data: function data () {
      return {
        tab: null
      }
    },
    computed: {
      tabKeys: function tabKeys () {
        return Object.keys(this.item)
      }
    },
    methods: {
      isAllItemWidget: function isAllItemWidget () {
        var this$1$1 = this;

        var widgetCount = Object.keys(this.item).filter(function (key) { return this$1$1.isCategoryItemWidget(this$1$1.item[key]); }).length;
        var categoryCount = Object.keys(this.item).length;
        return widgetCount === categoryCount
      },
      onSelectWidget: function onSelectWidget (data) {
        this.$emit('selectWidget', data);
      },
      isCategoryItemWidget: function isCategoryItemWidget (categoryItemWidget) {
        return Object.keys(categoryItemWidget).filter(function (key) { return typeof categoryItemWidget[key] === 'string'; }).length > 0
      }
    }
  };

  var _hoisted_1$g = {
    key: 0,
    class: "row"
  };
  var _hoisted_2$d = { class: "text-h6" };

  function render$k(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_tab = vue.resolveComponent("q-tab");
    var _component_q_tabs = vue.resolveComponent("q-tabs");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_widget_list_category = vue.resolveComponent("widget-list-category", true);
    var _component_q_tab_panel = vue.resolveComponent("q-tab-panel");
    var _component_q_tab_panels = vue.resolveComponent("q-tab-panels");
    var _component_q_card = vue.resolveComponent("q-card");

    return (vue.openBlock(), vue.createBlock(_component_q_card, { class: "full-width" }, {
      default: vue.withCtx(function () { return [
        ($options.isAllItemWidget())
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$g, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabKeys, function (tabKey) {
                return (vue.openBlock(), vue.createElementBlock("div", {
                  key: tabKey,
                  class: "col-12"
                }, [
                  vue.createVNode(_component_q_btn, {
                    outline: "",
                    rounded: "",
                    icon: "widgets",
                    color: "primary",
                    class: "full-width",
                    label: $props.item[tabKey].name,
                    onClick: function ($event) { return ($options.onSelectWidget($props.item[tabKey])); },
                    onSelectWidget: $options.onSelectWidget
                  }, null, 8, ["label", "onClick", "onSelectWidget"])
                ]))
              }), 128))
            ]))
          : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createVNode(_component_q_tabs, {
                modelValue: $data.tab,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($data.tab) = $event); }),
                dense: "",
                class: "text-grey",
                "active-color": "primary",
                "indicator-color": "primary",
                align: "justify",
                vertical: $options.tabKeys.length > 3,
                "narrow-indicator": ""
              }, {
                default: vue.withCtx(function () { return [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabKeys, function (tabKey) {
                    return (vue.openBlock(), vue.createBlock(_component_q_tab, {
                      key: tabKey,
                      name: tabKey,
                      label: tabKey
                    }, null, 8, ["name", "label"]))
                  }), 128))
                ]; }),
                _: 1
              }, 8, ["modelValue", "vertical"]),
              vue.createVNode(_component_q_separator),
              vue.createVNode(_component_q_tab_panels, {
                modelValue: $data.tab,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($data.tab) = $event); }),
                animated: ""
              }, {
                default: vue.withCtx(function () { return [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabKeys, function (tabKey) {
                    return (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                      key: tabKey,
                      name: tabKey
                    }, {
                      default: vue.withCtx(function () { return [
                        vue.createElementVNode("div", _hoisted_2$d, vue.toDisplayString(tabKey), 1),
                        ($options.isCategoryItemWidget($props.item[tabKey]))
                          ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                              key: 0,
                              outline: "",
                              rounded: "",
                              icon: "widgets",
                              color: "primary",
                              label: $props.item[tabKey].name,
                              onClick: function ($event) { return ($options.onSelectWidget($props.item[tabKey])); },
                              onSelectWidget: $options.onSelectWidget
                            }, null, 8, ["label", "onClick", "onSelectWidget"]))
                          : (vue.openBlock(), vue.createBlock(_component_widget_list_category, {
                              key: 1,
                              item: $props.item[tabKey],
                              onSelectWidget: $options.onSelectWidget
                            }, null, 8, ["item", "onSelectWidget"]))
                      ]; }),
                      _: 2
                    }, 1032, ["name"]))
                  }), 128))
                ]; }),
                _: 1
              }, 8, ["modelValue"])
            ], 64))
      ]; }),
      _: 1
    }))
  }

  script$k.render = render$k;
  script$k.__scopeId = "data-v-a32261f8";

  var script$j = vue.defineComponent({
    name: 'PageBuilderWidgetList',
    components: { WidgetListCategory: script$k },
    emits: ['selectWidget'],
    setup: function setup() {
      var $q = quasar.useQuasar();
      var widgetExpanded = $q.$QPageBuilderWidgetList;

      function getCategorizedWidget (widgetExpanded) {
        var categories = {};
        widgetExpanded.forEach(function (widgetItem) {
          r(categories, widgetItem.path.replaceAll('/', '.'), widgetItem);
        });

        function isCategoryItemWidget (categoryItemWidget) {
          return Object.keys(categoryItemWidget).filter(function (key) { return typeof categoryItemWidget[key] === 'string'; }).length > 0
        }
        function createUnCategoriezedItem (categoriezedObject) {
          var widgetCount = Object.keys(categoriezedObject).filter(function (key) { return isCategoryItemWidget(categoriezedObject[key]); }).length;
          var categoryCount = Object.keys(categoriezedObject).length;
          var isAllItemWidget = widgetCount === categoryCount;
          Object.keys(categoriezedObject).forEach(function (key) {
            var isWidget = isAllItemWidget || isCategoryItemWidget(categoriezedObject[key]);
            if (isWidget && !isAllItemWidget) {
              if (!categoriezedObject.unCategoriezed) {
                categoriezedObject.unCategoriezed = {};
              }
              categoriezedObject.unCategoriezed[key] = categoriezedObject[key];
              delete categoriezedObject[key];
            } else if (!isAllItemWidget) {
              createUnCategoriezedItem(categoriezedObject[key]);
            }
          });
        }

        createUnCategoriezedItem(categories);
        return categories
      }

      var categoriezedWidget = getCategorizedWidget(widgetExpanded);

      return {
        categoriezedWidget: categoriezedWidget
      }
    },
    methods: {
      onSelectWidget: function onSelectWidget (data) {
        this.$emit('selectWidget', data);
      }
    }
  });

  var _hoisted_1$f = { class: "widgets-container" };

  function render$j(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_widget_list_category = vue.resolveComponent("widget-list-category");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
      vue.createVNode(_component_widget_list_category, {
        item: _ctx.categoriezedWidget,
        onSelectWidget: _ctx.onSelectWidget
      }, null, 8, ["item", "onSelectWidget"])
    ]))
  }

  script$j.render = render$j;
  script$j.__scopeId = "data-v-30703bd0";

  var script$i = {
    name: 'ShadowItem',
    props: {
      boxShadow: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    data: function () {
      return {
        defaultOptions: {
          blurRadius: 0,
          spreadRadius: 0,
          verticalOffset: 0,
          horizontalOffset: 0,
          color: 'rgba(0,0,0,0.1)',
          inset: false,
          cssString: ''
        }
      }
    },
    computed: {
      sampleShadow: function sampleShadow () {
        var shadow = this.localBoxShadow.horizontalOffset + 'px ' +
            this.localBoxShadow.verticalOffset + 'px ' +
            this.localBoxShadow.blurRadius + 'px ' +
            this.localBoxShadow.spreadRadius + 'px ' +
            this.localBoxShadow.color + ' ' +
            (this.localBoxShadow.inset ? 'inset' : '');

        return shadow
      },
      localBoxShadow: {
        get: function get () {
          return Object.assign(this.defaultOptions, this.boxShadow)
        },
        set: function set (newValue) {
          this.$emit('update:boxShadow', newValue);
        }
      }
    },
    methods: {
      getShadowFromObject: function getShadowFromObject (object) {
        return object.horizontalOffset + 'px ' +
            object.verticalOffset + 'px ' +
            object.blurRadius + 'px ' +
            object.spreadRadius + 'px ' +
            object.color + ' ' +
            (object.inset ? 'inset' : '')
      },
      onUpdateBoxShadow: function onUpdateBoxShadow () {
        this.localBoxShadow.cssString = this.getShadowFromObject(this.localBoxShadow);
        this.$emit('update:boxShadow', this.localBoxShadow);
      }
    }
  };

  var _withScopeId$1 = function (n) { return (vue.pushScopeId("data-v-2d1f807c"),n=n(),vue.popScopeId(),n); };
  var _hoisted_1$e = { class: "row q-col-gutter-md" };
  var _hoisted_2$c = { class: "col-md-8" };
  var _hoisted_3$b = { class: "SampleBoxCanvas" };
  var _hoisted_4$b = /*#__PURE__*/ _withScopeId$1(function () { return vue.createElementVNode("div", null, " Inset ", -1); });
  var _hoisted_5$7 = { class: "col-md-4 flex justify-center align-center" };

  function render$i(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_slider = vue.resolveComponent("q-slider");
    var _component_q_checkbox = vue.resolveComponent("q-checkbox");
    var _component_q_color = vue.resolveComponent("q-color");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");

    return (vue.openBlock(), vue.createBlock(_component_q_card, { class: "ShadowItem" }, {
      default: vue.withCtx(function () { return [
        vue.createVNode(_component_q_card_section, null, {
          default: vue.withCtx(function () { return [
            vue.createElementVNode("div", _hoisted_1$e, [
              vue.createElementVNode("div", _hoisted_2$c, [
                vue.createElementVNode("div", _hoisted_3$b, [
                  vue.createElementVNode("div", {
                    class: "SampleBox",
                    style: vue.normalizeStyle({boxShadow: $options.sampleShadow})
                  }, null, 4)
                ]),
                vue.createElementVNode("div", null, " Horizontal offset (" + vue.toDisplayString($options.localBoxShadow.horizontalOffset) + ") ", 1),
                vue.createVNode(_component_q_slider, {
                  modelValue: $options.localBoxShadow.horizontalOffset,
                  "onUpdate:modelValue": [
                    _cache[0] || (_cache[0] = function ($event) { return (($options.localBoxShadow.horizontalOffset) = $event); }),
                    $options.onUpdateBoxShadow
                  ],
                  min: -100,
                  max: 100,
                  step: 0.5
                }, null, 8, ["modelValue", "step", "onUpdate:modelValue"]),
                vue.createElementVNode("div", null, " Vertical offset (" + vue.toDisplayString($options.localBoxShadow.verticalOffset) + ") ", 1),
                vue.createVNode(_component_q_slider, {
                  modelValue: $options.localBoxShadow.verticalOffset,
                  "onUpdate:modelValue": [
                    _cache[1] || (_cache[1] = function ($event) { return (($options.localBoxShadow.verticalOffset) = $event); }),
                    $options.onUpdateBoxShadow
                  ],
                  min: -100,
                  max: 100,
                  step: 0.5
                }, null, 8, ["modelValue", "step", "onUpdate:modelValue"]),
                vue.createElementVNode("div", null, " Blur radius (" + vue.toDisplayString($options.localBoxShadow.blurRadius) + ") ", 1),
                vue.createVNode(_component_q_slider, {
                  modelValue: $options.localBoxShadow.blurRadius,
                  "onUpdate:modelValue": [
                    _cache[2] || (_cache[2] = function ($event) { return (($options.localBoxShadow.blurRadius) = $event); }),
                    $options.onUpdateBoxShadow
                  ],
                  min: 0,
                  max: 100,
                  step: 0.5
                }, null, 8, ["modelValue", "step", "onUpdate:modelValue"]),
                vue.createElementVNode("div", null, " Spread radius (" + vue.toDisplayString($options.localBoxShadow.spreadRadius) + ") ", 1),
                vue.createVNode(_component_q_slider, {
                  modelValue: $options.localBoxShadow.spreadRadius,
                  "onUpdate:modelValue": [
                    _cache[3] || (_cache[3] = function ($event) { return (($options.localBoxShadow.spreadRadius) = $event); }),
                    $options.onUpdateBoxShadow
                  ],
                  min: -100,
                  max: 100,
                  step: 0.5
                }, null, 8, ["modelValue", "step", "onUpdate:modelValue"]),
                _hoisted_4$b,
                vue.createVNode(_component_q_checkbox, {
                  modelValue: $options.localBoxShadow.inset,
                  "onUpdate:modelValue": [
                    _cache[4] || (_cache[4] = function ($event) { return (($options.localBoxShadow.inset) = $event); }),
                    $options.onUpdateBoxShadow
                  ]
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              vue.createElementVNode("div", _hoisted_5$7, [
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_q_color, {
                    modelValue: $options.localBoxShadow.color,
                    "onUpdate:modelValue": [
                      _cache[5] || (_cache[5] = function ($event) { return (($options.localBoxShadow.color) = $event); }),
                      $options.onUpdateBoxShadow
                    ]
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ])
          ]; }),
          _: 1
        })
      ]; }),
      _: 1
    }))
  }

  script$i.render = render$i;
  script$i.__scopeId = "data-v-2d1f807c";

  var script$h = {
    name: 'BoxShadows',
    components: { ShadowItem: script$i },
    props: {
      boxShadows: {
        default: function () {
          return []
        },
        type: [Array, Object]
      }
    },
    computed: {
      shadows: function shadows () {
        var shadows = [];
        this.localBoxShadows.forEach(function (shadow) {
          shadows.push(shadow.cssString);
        });

        return shadows.join(', ')
      },
      localBoxShadows: {
        get: function get () {
          return this.boxShadows
        },
        set: function set (newValue) {
          this.$emit('update:boxShadows', newValue);
        }
      }
    },
    methods: {
      addShadow: function addShadow () {
        this.localBoxShadows.push({
          blurRadius: 0,
          spreadRadius: 0,
          verticalOffset: 0,
          horizontalOffset: 0,
          color: 'rgba(0,0,0,0.1)',
          cssString: '',
          inset: false
        });
      },
      removeShadow: function removeShadow (index) {
        this.localBoxShadows.splice(index, 1);
      }
    }
  };

  var _hoisted_1$d = { class: "BoxShadows row q-col-gutter-md" };
  var _hoisted_2$b = { class: "col-md-10 col-12" };
  var _hoisted_3$a = { class: "full-width" };
  var _hoisted_4$a = { class: "col-md-2 col-12" };

  function render$h(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_shadow_item = vue.resolveComponent("shadow-item");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");
    var _component_q_expansion_item = vue.resolveComponent("q-expansion-item");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$d, [
      vue.createElementVNode("div", _hoisted_2$b, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.localBoxShadows, function (boxShadow, index) {
          return (vue.openBlock(), vue.createBlock(_component_q_expansion_item, {
            key: index,
            "expand-separator": ""
          }, {
            header: vue.withCtx(function () { return [
              vue.createElementVNode("div", _hoisted_3$a, [
                vue.createVNode(_component_q_btn, {
                  flat: "",
                  round: "",
                  class: "q-mr-md",
                  onClick: function ($event) { return ($options.removeShadow(index)); }
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createTextVNode(" - ")
                  ]; }),
                  _: 2
                }, 1032, ["onClick"]),
                vue.createTextVNode(" " + vue.toDisplayString('Shadow ' + (index + 1)), 1)
              ])
            ]; }),
            default: vue.withCtx(function () { return [
              vue.createVNode(_component_q_card, null, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card_section, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_shadow_item, {
                        "box-shadow": $options.localBoxShadows[index],
                        "onUpdate:boxShadow": function ($event) { return (($options.localBoxShadows[index]) = $event); }
                      }, null, 8, ["box-shadow", "onUpdate:boxShadow"])
                    ]; }),
                    _: 2
                  }, 1024)
                ]; }),
                _: 2
              }, 1024)
            ]; }),
            _: 2
          }, 1024))
        }), 128))
      ]),
      vue.createElementVNode("div", _hoisted_4$a, [
        vue.createVNode(_component_q_card, null, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_card_section, { class: "SampleBoxCanvas flex justify-center align-center" }, {
              default: vue.withCtx(function () { return [
                vue.createElementVNode("div", {
                  class: "SampleBox",
                  style: vue.normalizeStyle({boxShadow: $options.shadows})
                }, null, 4)
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        }),
        vue.createVNode(_component_q_btn, { onClick: $options.addShadow }, {
          default: vue.withCtx(function () { return [
            vue.createTextVNode(" add shadow ")
          ]; }),
          _: 1
        }, 8, ["onClick"])
      ])
    ]))
  }

  script$h.render = render$h;
  script$h.__scopeId = "data-v-09c90ea8";

  var script$g = {
    name: 'BorderStyle',
    props: {
      borderStyle: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    data: function () {
      return {
        allCorners: 0,
        topLeftRadiusUnit: 'px',
        topRightRadiusUnit: 'px',
        bottomLeftRadiusUnit: 'px',
        bottomRightRadiusUnit: 'px',
        defaultBorderStyle: {
          topLeftRadius: 0,
          topRightRadius: 0,
          bottomLeftRadius: 0,
          bottomRightRadius: 0,
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0.1)',
          borderStyle: 'solid',
          borderCssString: '',
          borderRadiusCssString: ''
        }
      }
    },
    computed: {
      border: function border () {
        return this.localBorderStyle.borderStyle + ' ' + this.localBorderStyle.borderWidth + 'px ' + this.localBorderStyle.borderColor
      },
      borderRadius: function borderRadius () {
        return this.localBorderStyle.topLeftRadius + this.topLeftRadiusUnit + ' ' +
            this.localBorderStyle.topRightRadius + this.topRightRadiusUnit + ' ' +
            this.localBorderStyle.bottomRightRadius + this.bottomRightRadiusUnit + ' ' +
            this.localBorderStyle.bottomLeftRadius + this.bottomLeftRadiusUnit
      },
      localBorderStyle: {
        get: function get () {
          return Object.assign(this.defaultBorderStyle, this.borderStyle)
        },
        set: function set (newValue) {
          this.$emit('update:borderStyle', newValue);
        }
      }
    },
    methods: {
      onUpdateAllCorners: function onUpdateAllCorners () {
        this.localBorderStyle.topLeftRadius = this.allCorners;
        this.localBorderStyle.topRightRadius = this.allCorners;
        this.localBorderStyle.bottomLeftRadius = this.allCorners;
        this.localBorderStyle.bottomRightRadius = this.allCorners;
        this.onUpdateBorderStyle();
      },
      onUpdateBorderStyle: function onUpdateBorderStyle () {
        this.localBorderStyle.borderCssString = this.border;
        this.localBorderStyle.borderRadiusCssString = this.borderRadius;
        this.$emit('update:borderStyle', this.localBorderStyle);
      }
    }
  };

  var _withScopeId = function (n) { return (vue.pushScopeId("data-v-a0ba0ab6"),n=n(),vue.popScopeId(),n); };
  var _hoisted_1$c = { class: "BorderStyle row q-col-gutter-md" };
  var _hoisted_2$a = { class: "col-md-8 col-12" };
  var _hoisted_3$9 = /*#__PURE__*/ _withScopeId(function () { return vue.createElementVNode("div", null, " Border Style ", -1); });
  var _hoisted_4$9 = { class: "col-md-4 col-12" };

  function render$g(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_slider = vue.resolveComponent("q-slider");
    var _component_q_select = vue.resolveComponent("q-select");
    var _component_q_color = vue.resolveComponent("q-color");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
      vue.createElementVNode("div", _hoisted_2$a, [
        vue.createElementVNode("div", null, " All Corners Radius (" + vue.toDisplayString(_ctx.allCorners) + ") ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: _ctx.allCorners,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = function ($event) { return ((_ctx.allCorners) = $event); }),
            $options.onUpdateAllCorners
          ],
          min: 0,
          max: 200,
          step: 1
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        vue.createElementVNode("div", null, [
          vue.createTextVNode(" Top Left Radius (" + vue.toDisplayString($options.localBorderStyle.topLeftRadius) + " ", 1),
          vue.createVNode(_component_q_select, {
            modelValue: _ctx.topLeftRadiusUnit,
            "onUpdate:modelValue": [
              _cache[1] || (_cache[1] = function ($event) { return ((_ctx.topLeftRadiusUnit) = $event); }),
              $options.onUpdateBorderStyle
            ],
            class: "unitSelector",
            label: "unit",
            options: ['px', '%']
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          vue.createTextVNode(") ")
        ]),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localBorderStyle.topLeftRadius,
          "onUpdate:modelValue": [
            _cache[2] || (_cache[2] = function ($event) { return (($options.localBorderStyle.topLeftRadius) = $event); }),
            $options.onUpdateBorderStyle
          ],
          min: 0,
          max: 200,
          step: 1
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        vue.createElementVNode("div", null, [
          vue.createTextVNode(" Top Righ Radius (" + vue.toDisplayString($options.localBorderStyle.topRightRadius) + " ", 1),
          vue.createVNode(_component_q_select, {
            modelValue: _ctx.topRightRadiusUnit,
            "onUpdate:modelValue": [
              _cache[3] || (_cache[3] = function ($event) { return ((_ctx.topRightRadiusUnit) = $event); }),
              $options.onUpdateBorderStyle
            ],
            class: "unitSelector",
            label: "unit",
            options: ['px', '%']
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          vue.createTextVNode(") ")
        ]),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localBorderStyle.topRightRadius,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = function ($event) { return (($options.localBorderStyle.topRightRadius) = $event); }),
            $options.onUpdateBorderStyle
          ],
          min: 0,
          max: 200,
          step: 1
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        vue.createElementVNode("div", null, [
          vue.createTextVNode(" Bottom Right Radius (" + vue.toDisplayString($options.localBorderStyle.bottomRightRadius) + " ", 1),
          vue.createVNode(_component_q_select, {
            modelValue: _ctx.bottomRightRadiusUnit,
            "onUpdate:modelValue": [
              _cache[5] || (_cache[5] = function ($event) { return ((_ctx.bottomRightRadiusUnit) = $event); }),
              $options.onUpdateBorderStyle
            ],
            class: "unitSelector",
            label: "unit",
            options: ['px', '%']
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          vue.createTextVNode(") ")
        ]),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localBorderStyle.bottomRightRadius,
          "onUpdate:modelValue": [
            _cache[6] || (_cache[6] = function ($event) { return (($options.localBorderStyle.bottomRightRadius) = $event); }),
            $options.onUpdateBorderStyle
          ],
          min: 0,
          max: 200,
          step: 1
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        vue.createElementVNode("div", null, [
          vue.createTextVNode(" Bottom Left Radius (" + vue.toDisplayString($options.localBorderStyle.bottomLeftRadius) + " ", 1),
          vue.createVNode(_component_q_select, {
            modelValue: _ctx.bottomLeftRadiusUnit,
            "onUpdate:modelValue": [
              _cache[7] || (_cache[7] = function ($event) { return ((_ctx.bottomLeftRadiusUnit) = $event); }),
              $options.onUpdateBorderStyle
            ],
            class: "unitSelector",
            label: "unit",
            options: ['px', '%']
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          vue.createTextVNode(") ")
        ]),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localBorderStyle.bottomLeftRadius,
          "onUpdate:modelValue": [
            _cache[8] || (_cache[8] = function ($event) { return (($options.localBorderStyle.bottomLeftRadius) = $event); }),
            $options.onUpdateBorderStyle
          ],
          min: 0,
          max: 200,
          step: 1
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        vue.createElementVNode("div", null, " Border Width (" + vue.toDisplayString($options.localBorderStyle.borderWidth) + "px) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localBorderStyle.borderWidth,
          "onUpdate:modelValue": [
            _cache[9] || (_cache[9] = function ($event) { return (($options.localBorderStyle.borderWidth) = $event); }),
            $options.onUpdateBorderStyle
          ],
          min: 0,
          max: 200,
          step: 1
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        _hoisted_3$9,
        vue.createVNode(_component_q_select, {
          modelValue: $options.localBorderStyle.borderStyle,
          "onUpdate:modelValue": [
            _cache[10] || (_cache[10] = function ($event) { return (($options.localBorderStyle.borderStyle) = $event); }),
            $options.onUpdateBorderStyle
          ],
          label: "backgroundRepeat",
          options: [
                    'solid',
                    'dotted',
                    'dashed',
                    'double',
                    'groove',
                    'ridge',
                    'inset',
                    'outset',
                    'none',
                    'hidden'
                  ]
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      vue.createElementVNode("div", _hoisted_4$9, [
        vue.createVNode(_component_q_card, null, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_card_section, { class: "SampleBoxCanvas flex justify-center align-center" }, {
              default: vue.withCtx(function () { return [
                vue.createElementVNode("div", {
                  class: "SampleBox",
                  style: vue.normalizeStyle({border: $options.border, borderRadius: $options.borderRadius})
                }, null, 4),
                vue.createVNode(_component_q_color, {
                  modelValue: $options.localBorderStyle.borderColor,
                  "onUpdate:modelValue": [
                    _cache[11] || (_cache[11] = function ($event) { return (($options.localBorderStyle.borderColor) = $event); }),
                    $options.onUpdateBorderStyle
                  ],
                  class: "q-mt-lg"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        })
      ])
    ]))
  }

  script$g.render = render$g;
  script$g.__scopeId = "data-v-a0ba0ab6";

  var script$f = {
    name: 'HoverEffects',
    components: { BorderStyle: script$g, BoxShadows: script$h },
    props: {
      cssHoverEffects: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    data: function () {
      return {
        defaultCssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    },
    computed: {
      localCssHoverEffects: {
        get: function get () {
          return this.cssHoverEffects
        },
        set: function set (newValue) {
          this.$emit('update:cssHoverEffects', newValue);
        }
      }
    },
    methods: {
      resetTransforms: function resetTransforms () {
        this.localCssHoverEffects.transform.rotate = null;
        this.localCssHoverEffects.transform.scaleX = null;
        this.localCssHoverEffects.transform.scaleY = null;
        this.localCssHoverEffects.transform.skewX = null;
        this.localCssHoverEffects.transform.skewY = null;
        this.localCssHoverEffects.transform.translateX = null;
        this.localCssHoverEffects.transform.translateY = null;
      }
    }
  };

  var _hoisted_1$b = { class: "row q-col-gutter-md" };
  var _hoisted_2$9 = { class: "col-12" };
  var _hoisted_3$8 = /*#__PURE__*/vue.createElementVNode("div", null, " shadow ", -1);
  var _hoisted_4$8 = /*#__PURE__*/vue.createElementVNode("div", null, " border ", -1);

  function render$f(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_slider = vue.resolveComponent("q-slider");
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_box_shadows = vue.resolveComponent("box-shadows");
    var _component_border_style = vue.resolveComponent("border-style");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$b, [
      vue.createElementVNode("div", _hoisted_2$9, [
        vue.createElementVNode("div", null, " transition time (" + vue.toDisplayString($options.localCssHoverEffects.transition.time) + "s) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transition.time,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($options.localCssHoverEffects.transition.time) = $event); }),
          min: 0,
          max: 10,
          step: 0.1
        }, null, 8, ["modelValue", "step"]),
        vue.createVNode(_component_q_btn, {
          class: "full-width q-mb-md",
          color: "primary",
          onClick: $options.resetTransforms
        }, {
          default: vue.withCtx(function () { return [
            vue.createTextVNode(" reset transforms ")
          ]; }),
          _: 1
        }, 8, ["onClick"]),
        vue.createElementVNode("div", null, " Rotate (" + vue.toDisplayString($options.localCssHoverEffects.transform.rotate) + "deg) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.rotate,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($options.localCssHoverEffects.transform.rotate) = $event); }),
          min: 0,
          max: 360
        }, null, 8, ["modelValue"]),
        vue.createElementVNode("div", null, " Scale X (" + vue.toDisplayString($options.localCssHoverEffects.transform.scaleX) + ") ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.scaleX,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($options.localCssHoverEffects.transform.scaleX) = $event); }),
          min: 0.25,
          max: 3,
          step: 0.2
        }, null, 8, ["modelValue", "min", "step"]),
        vue.createElementVNode("div", null, " Scale Y (" + vue.toDisplayString($options.localCssHoverEffects.transform.scaleY) + ") ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.scaleY,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return (($options.localCssHoverEffects.transform.scaleY) = $event); }),
          min: 0.25,
          max: 3,
          step: 0.2
        }, null, 8, ["modelValue", "min", "step"]),
        vue.createElementVNode("div", null, " Skew X (" + vue.toDisplayString($options.localCssHoverEffects.transform.skewX) + "deg) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.skewX,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) { return (($options.localCssHoverEffects.transform.skewX) = $event); }),
          min: -90,
          max: 90,
          step: 1
        }, null, 8, ["modelValue"]),
        vue.createElementVNode("div", null, " Skew Y (" + vue.toDisplayString($options.localCssHoverEffects.transform.skewY) + "deg) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.skewY,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($options.localCssHoverEffects.transform.skewY) = $event); }),
          min: -90,
          max: 90,
          step: 1
        }, null, 8, ["modelValue"]),
        vue.createElementVNode("div", null, " Translate X (" + vue.toDisplayString($options.localCssHoverEffects.transform.translateX) + "px) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.translateX,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return (($options.localCssHoverEffects.transform.translateX) = $event); }),
          min: -300,
          max: 300,
          step: 1
        }, null, 8, ["modelValue"]),
        vue.createElementVNode("div", null, " Translate y (" + vue.toDisplayString($options.localCssHoverEffects.transform.translateY) + "px) ", 1),
        vue.createVNode(_component_q_slider, {
          modelValue: $options.localCssHoverEffects.transform.translateY,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) { return (($options.localCssHoverEffects.transform.translateY) = $event); }),
          min: -300,
          max: 300,
          step: 1
        }, null, 8, ["modelValue"]),
        vue.createElementVNode("div", null, [
          vue.createVNode(_component_q_separator, { class: "q-my-md" }),
          _hoisted_3$8,
          vue.createVNode(_component_box_shadows, {
            "box-shadows": $options.localCssHoverEffects.boxShadows,
            "onUpdate:boxShadows": _cache[8] || (_cache[8] = function ($event) { return (($options.localCssHoverEffects.boxShadows) = $event); })
          }, null, 8, ["box-shadows"])
        ]),
        vue.createElementVNode("div", null, [
          vue.createVNode(_component_q_separator, { class: "q-my-md" }),
          _hoisted_4$8,
          vue.createVNode(_component_border_style, {
            "border-style": $options.localCssHoverEffects.borderStyle,
            "onUpdate:borderStyle": _cache[9] || (_cache[9] = function ($event) { return (($options.localCssHoverEffects.borderStyle) = $event); })
          }, null, 8, ["border-style"])
        ])
      ])
    ]))
  }

  script$f.render = render$f;

  var script$e = {
    name: 'ResponsiveShow',
    props: {
      responsiveShow: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    data: function () {
      return {
        defaultResponsiveShow: {
          xl: true,
          lg: true,
          md: true,
          sm: true,
          xs: true
        }
      }
    },
    computed: {
      localResponsiveShow: {
        get: function get () {
          return Object.assign(this.defaultResponsiveShow, this.responsiveShow)
        },
        set: function set (newValue) {
          this.$emit('update:responsiveShow', newValue);
        }
      }
    },
    methods: {
      onChange: function onChange () {
        this.$emit('update:responsiveShow', this.localResponsiveShow);
      }
    }
  };

  var _hoisted_1$a = { class: "row q-col-gutter-md justify-center" };
  var _hoisted_2$8 = { class: "col-md-2 -col-12" };
  var _hoisted_3$7 = { class: "col-md-2 -col-12" };
  var _hoisted_4$7 = { class: "col-md-2 -col-12" };
  var _hoisted_5$6 = { class: "col-md-2 -col-12" };
  var _hoisted_6$5 = { class: "col-md-2 -col-12" };

  function render$e(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_icon = vue.resolveComponent("q-icon");
    var _component_q_checkbox = vue.resolveComponent("q-checkbox");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
      vue.createElementVNode("div", _hoisted_2$8, [
        vue.createVNode(_component_q_icon, {
          name: "live_tv",
          size: "lg",
          color: "grey"
        }),
        vue.createVNode(_component_q_checkbox, {
          modelValue: $options.localResponsiveShow.xl,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = function ($event) { return (($options.localResponsiveShow.xl) = $event); }),
            $options.onChange
          ],
          label: "xl"
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      vue.createElementVNode("div", _hoisted_3$7, [
        vue.createVNode(_component_q_icon, {
          name: "computer",
          size: "lg",
          color: "grey"
        }),
        vue.createVNode(_component_q_checkbox, {
          modelValue: $options.localResponsiveShow.lg,
          "onUpdate:modelValue": [
            _cache[1] || (_cache[1] = function ($event) { return (($options.localResponsiveShow.lg) = $event); }),
            $options.onChange
          ],
          label: "lg"
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      vue.createElementVNode("div", _hoisted_4$7, [
        vue.createVNode(_component_q_icon, {
          name: "laptop",
          size: "lg",
          color: "grey"
        }),
        vue.createVNode(_component_q_checkbox, {
          modelValue: $options.localResponsiveShow.md,
          "onUpdate:modelValue": [
            _cache[2] || (_cache[2] = function ($event) { return (($options.localResponsiveShow.md) = $event); }),
            $options.onChange
          ],
          label: "md"
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      vue.createElementVNode("div", _hoisted_5$6, [
        vue.createVNode(_component_q_icon, {
          name: "tablet_android",
          size: "lg",
          color: "grey"
        }),
        vue.createVNode(_component_q_checkbox, {
          modelValue: $options.localResponsiveShow.sm,
          "onUpdate:modelValue": [
            _cache[3] || (_cache[3] = function ($event) { return (($options.localResponsiveShow.sm) = $event); }),
            $options.onChange
          ],
          label: "sm"
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      vue.createElementVNode("div", _hoisted_6$5, [
        vue.createVNode(_component_q_icon, {
          name: "phone_iphone",
          size: "lg",
          color: "grey"
        }),
        vue.createVNode(_component_q_checkbox, {
          modelValue: $options.localResponsiveShow.xs,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = function ($event) { return (($options.localResponsiveShow.xs) = $event); }),
            $options.onChange
          ],
          label: "xs"
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ])
    ]))
  }

  script$e.render = render$e;

  var components$2 = {};
  var script$d = {
    name: 'Background',
    components: components$2,
    props: {
      value: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    setup: function setup () {
      var $q = quasar.useQuasar();
      if ($q.$pageBuilderWidgetOptionPanelImageUploader) {
        components$2.BackgroundImageSrcInput = $q.$pageBuilderWidgetOptionPanelImageUploader;
      }

      var hasBackgroundImageSrcInputComponent = function () {
        return !!$q.$pageBuilderWidgetOptionPanelImageUploader
      };

      return {
        hasBackgroundImageSrcInputComponent: hasBackgroundImageSrcInputComponent
      }
    },
    computed: {
      localValue: {
        get: function get () {
          return this.value
        },
        set: function set (newValue) {
          this.$emit('update:value', newValue);
        }
      }
    }
  };

  var _hoisted_1$9 = { class: "row q-col-gutter-md" };
  var _hoisted_2$7 = { class: "col-md-6" };
  var _hoisted_3$6 = { class: "row" };
  var _hoisted_4$6 = { class: "col-12" };
  var _hoisted_5$5 = { class: "col-md-12" };
  var _hoisted_6$4 = { class: "col-md-12" };
  var _hoisted_7$4 = { class: "col-md-6" };
  var _hoisted_8$3 = { class: "row" };
  var _hoisted_9$2 = { class: "col-12" };
  var _hoisted_10$2 = { class: "col-md-12" };
  var _hoisted_11$2 = { class: "col-md-12" };

  function render$d(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_color = vue.resolveComponent("q-color");
    var _component_q_popup_proxy = vue.resolveComponent("q-popup-proxy");
    var _component_q_icon = vue.resolveComponent("q-icon");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_q_select = vue.resolveComponent("q-select");
    var _component_BackgroundImageSrcInput = vue.resolveComponent("BackgroundImageSrcInput");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$9, [
      vue.createElementVNode("div", _hoisted_2$7, [
        vue.createElementVNode("div", _hoisted_3$6, [
          vue.createElementVNode("div", _hoisted_4$6, [
            vue.createVNode(_component_q_input, {
              modelValue: $options.localValue.backgroundColor,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($options.localValue.backgroundColor) = $event); }),
              label: "backgroundColor"
            }, {
              append: vue.withCtx(function () { return [
                vue.createVNode(_component_q_icon, {
                  name: "colorize",
                  class: "cursor-pointer"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_q_popup_proxy, {
                      cover: "",
                      "transition-show": "scale",
                      "transition-hide": "scale"
                    }, {
                      default: vue.withCtx(function () { return [
                        vue.createVNode(_component_q_color, {
                          modelValue: $options.localValue.backgroundColor,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($options.localValue.backgroundColor) = $event); }),
                          label: "backgroundColor",
                          "default-value": 'rgba(34,255,0,0.72)',
                          "format-model": "rgba"
                        }, null, 8, ["modelValue", "default-value"])
                      ]; }),
                      _: 1
                    })
                  ]; }),
                  _: 1
                })
              ]; }),
              _: 1
            }, 8, ["modelValue"])
          ]),
          vue.createElementVNode("div", _hoisted_5$5, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.backgroundRepeat,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($options.localValue.backgroundRepeat) = $event); }),
              label: "backgroundRepeat",
              options: [
                        'no-repeat',
                        'repeat',
                        'repeat-x',
                        'repeat-y',
                        'space',
                        'round',
                        'initial',
                        'inherit'
                      ]
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("div", _hoisted_6$4, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.backgroundAttachment,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return (($options.localValue.backgroundAttachment) = $event); }),
              label: "backgroundAttachment",
              options: [
                        'scroll',
                        'fixed',
                        'local',
                        'initial',
                        'inherit'
                      ]
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      vue.createElementVNode("div", _hoisted_7$4, [
        vue.createElementVNode("div", _hoisted_8$3, [
          vue.createElementVNode("div", _hoisted_9$2, [
            vue.renderSlot(_ctx.$slots, "backgroundImageSrcInput", {}, function () { return [
              ($setup.hasBackgroundImageSrcInputComponent())
                ? (vue.openBlock(), vue.createBlock(_component_BackgroundImageSrcInput, {
                    key: 0,
                    value: $options.localValue.backgroundImage,
                    "onUpdate:value": _cache[4] || (_cache[4] = function ($event) { return (($options.localValue.backgroundImage) = $event); })
                  }, null, 8, ["value"]))
                : (vue.openBlock(), vue.createBlock(_component_q_input, {
                    key: 1,
                    modelValue: $options.localValue.backgroundImage,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($options.localValue.backgroundImage) = $event); }),
                    label: "backgroundImage"
                  }, null, 8, ["modelValue"]))
            ]; })
          ]),
          vue.createElementVNode("div", _hoisted_10$2, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.backgroundPosition,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return (($options.localValue.backgroundPosition) = $event); }),
              label: "backgroundPosition",
              options: [
                        'center center',
                        'center top',
                        'center bottom',
                        'left top',
                        'left center',
                        'left bottom',
                        'right top',
                        'right center',
                        'right bottom'
                      ]
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("div", _hoisted_11$2, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.backgroundSize,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) { return (($options.localValue.backgroundSize) = $event); }),
              label: "backgroundSize",
              options: [
                        'cover',
                        'contain',
                        'inherit',
                        'initial',
                        'revert',
                        'revert-layer',
                        'unset'
                      ]
            }, null, 8, ["modelValue"])
          ])
        ])
      ])
    ]))
  }

  script$d.render = render$d;

  var script$c = {
    name: 'MarginAndPadding',
    props: {
      value: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    computed: {
      localValue: {
        get: function get () {
          return this.value
        },
        set: function set (newValue) {
          this.$emit('update:value', newValue);
        }
      }
    }
  };

  var _hoisted_1$8 = { class: "margin-square" };
  var _hoisted_2$6 = { class: "padding-square" };

  function render$c(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_input = vue.resolveComponent("q-input");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
      vue.createVNode(_component_q_input, {
        modelValue: $options.localValue.marginTop,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($options.localValue.marginTop) = $event); }),
        label: "marginTop",
        dense: "",
        class: "margin-input input-marginTop"
      }, null, 8, ["modelValue"]),
      vue.createVNode(_component_q_input, {
        modelValue: $options.localValue.marginLeft,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($options.localValue.marginLeft) = $event); }),
        label: "marginLeft",
        dense: "",
        class: "margin-input input-marginLeft"
      }, null, 8, ["modelValue"]),
      vue.createVNode(_component_q_input, {
        modelValue: $options.localValue.marginRight,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($options.localValue.marginRight) = $event); }),
        label: "marginRight",
        dense: "",
        class: "margin-input input-marginRight"
      }, null, 8, ["modelValue"]),
      vue.createVNode(_component_q_input, {
        modelValue: $options.localValue.marginBottom,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return (($options.localValue.marginBottom) = $event); }),
        label: "marginBottom",
        dense: "",
        class: "margin-input input-marginBottom"
      }, null, 8, ["modelValue"]),
      vue.createElementVNode("div", _hoisted_2$6, [
        vue.createVNode(_component_q_input, {
          modelValue: $options.localValue.paddingTop,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) { return (($options.localValue.paddingTop) = $event); }),
          label: "paddingTop",
          dense: "",
          class: "padding-input input-paddingTop"
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_q_input, {
          modelValue: $options.localValue.paddingLeft,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($options.localValue.paddingLeft) = $event); }),
          label: "paddingLeft",
          dense: "",
          class: "padding-input input-paddingLeft"
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_q_input, {
          modelValue: $options.localValue.paddingRight,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return (($options.localValue.paddingRight) = $event); }),
          label: "paddingRight",
          dense: "",
          class: "padding-input input-paddingRight"
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_q_input, {
          modelValue: $options.localValue.paddingBottom,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) { return (($options.localValue.paddingBottom) = $event); }),
          label: "paddingBottom",
          dense: "",
          class: "padding-input input-paddingBottom"
        }, null, 8, ["modelValue"])
      ])
    ]))
  }

  script$c.render = render$c;
  script$c.__scopeId = "data-v-14f2e26e";

  var script$b = {
    name: 'StyleTabComponent',
    components: {
      Background: script$d,
      MarginAndPadding: script$c
    },
    props: {
      styles: {
        type: Object,
        default: function () { return {} }
      }
    },
    data: function () {
      return {
        localTransitionTime: 0
      }
    },
    computed: {
      localStyles: {
        get: function get () {
          return this.styles
        },
        set: function set (newValue) {
          this.$emit('update:styles', newValue);
        }
      }
    },
    methods: {
      onLocalTransitionTime: function onLocalTransitionTime () {
        this.localStyles.transition = 'all ' + this.localTransitionTime + 's';
      }
    }
  };

  var _hoisted_1$7 = { class: "row q-col-gutter-md" };
  var _hoisted_2$5 = { class: "col-md-6" };
  var _hoisted_3$5 = { class: "col-md-6" };
  var _hoisted_4$5 = { class: "row q-col-gutter-md" };
  var _hoisted_5$4 = { class: "col-12" };

  function render$b(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_background = vue.resolveComponent("background");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");
    var _component_q_expansion_item = vue.resolveComponent("q-expansion-item");
    var _component_margin_and_padding = vue.resolveComponent("margin-and-padding");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_q_color = vue.resolveComponent("q-color");
    var _component_q_slider = vue.resolveComponent("q-slider");
    var _component_q_list = vue.resolveComponent("q-list");

    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createVNode(_component_q_list, { bordered: "" }, {
        default: vue.withCtx(function () { return [
          vue.createVNode(_component_q_expansion_item, {
            "expand-separator": "",
            icon: "image",
            label: "background"
          }, {
            default: vue.withCtx(function () { return [
              vue.createVNode(_component_q_card, null, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card_section, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_background, {
                        value: $options.localStyles,
                        "onUpdate:value": _cache[0] || (_cache[0] = function ($event) { return (($options.localStyles) = $event); })
                      }, {
                        backgroundImageSrcInput: vue.withCtx(function () { return [
                          vue.renderSlot(_ctx.$slots, "backgroundImageSrcInput")
                        ]; }),
                        _: 3
                      }, 8, ["value"])
                    ]; }),
                    _: 3
                  })
                ]; }),
                _: 3
              })
            ]; }),
            _: 3
          }),
          vue.createVNode(_component_q_expansion_item, {
            "expand-separator": "",
            label: "space"
          }, {
            default: vue.withCtx(function () { return [
              vue.createVNode(_component_q_card, null, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card_section, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_margin_and_padding, {
                        value: $options.localStyles,
                        "onUpdate:value": _cache[1] || (_cache[1] = function ($event) { return (($options.localStyles) = $event); })
                      }, null, 8, ["value"])
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              })
            ]; }),
            _: 1
          }),
          vue.createVNode(_component_q_expansion_item, {
            "expand-separator": "",
            label: "typography"
          }, {
            default: vue.withCtx(function () { return [
              vue.createVNode(_component_q_card, null, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card_section, null, {
                    default: vue.withCtx(function () { return [
                      vue.createElementVNode("div", _hoisted_1$7, [
                        vue.createElementVNode("div", _hoisted_2$5, [
                          vue.createVNode(_component_q_input, {
                            modelValue: $options.localStyles.fontFamily,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($options.localStyles.fontFamily) = $event); }),
                            label: "fontFamily"
                          }, null, 8, ["modelValue"]),
                          vue.createVNode(_component_q_input, {
                            modelValue: $options.localStyles.fontSize,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return (($options.localStyles.fontSize) = $event); }),
                            label: "fontSize"
                          }, null, 8, ["modelValue"]),
                          vue.createVNode(_component_q_input, {
                            modelValue: $options.localStyles.fontWeight,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) { return (($options.localStyles.fontWeight) = $event); }),
                            label: "fontWeight"
                          }, null, 8, ["modelValue"])
                        ]),
                        vue.createElementVNode("div", _hoisted_3$5, [
                          vue.createTextVNode(" color "),
                          vue.createVNode(_component_q_color, {
                            modelValue: $options.localStyles.color,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($options.localStyles.color) = $event); }),
                            "default-value": 'rgba(34,255,0,0.72)',
                            "format-model": "rgba"
                          }, null, 8, ["modelValue", "default-value"])
                        ])
                      ])
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              })
            ]; }),
            _: 1
          }),
          vue.createVNode(_component_q_expansion_item, {
            "expand-separator": "",
            label: "Transition"
          }, {
            default: vue.withCtx(function () { return [
              vue.createVNode(_component_q_card, null, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card_section, null, {
                    default: vue.withCtx(function () { return [
                      vue.createElementVNode("div", _hoisted_4$5, [
                        vue.createElementVNode("div", _hoisted_5$4, [
                          vue.createElementVNode("div", null, " transition: " + vue.toDisplayString($options.localStyles.transition), 1),
                          vue.createVNode(_component_q_slider, {
                            modelValue: _ctx.localTransitionTime,
                            "onUpdate:modelValue": [
                              _cache[6] || (_cache[6] = function ($event) { return ((_ctx.localTransitionTime) = $event); }),
                              $options.onLocalTransitionTime
                            ],
                            min: 0,
                            max: 10,
                            step: 0.1
                          }, null, 8, ["modelValue", "step", "onUpdate:modelValue"])
                        ])
                      ])
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              })
            ]; }),
            _: 1
          })
        ]; }),
        _: 3
      })
    ]))
  }

  script$b.render = render$b;

  var script$a = {
    name: 'ResponsiveSpacing',
    components: {
      MarginAndPadding: script$c
    },
    props: {
      spacing: {
        type: Object,
        default: function () {
        }
      }
    },
    data: function data() {
      return {
        tab: 'md',
        defaultSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        }
      }
    },
    computed: {
      localSpacing: {
        get: function get() {
          return Object.assign(this.defaultSpacing, this.spacing)
        },
        set: function set(newValue) {
          this.$emit('update:spacing', newValue);
        }
      }
    },
    methods: {
      getDefaultOptions: function getDefaultOptions (options) {
        if (!options.style) {
          options.style = {};
        }
        return options
      }
    }
  };

  function render$a(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_tab = vue.resolveComponent("q-tab");
    var _component_q_tabs = vue.resolveComponent("q-tabs");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_margin_and_padding = vue.resolveComponent("margin-and-padding");
    var _component_q_tab_panel = vue.resolveComponent("q-tab-panel");
    var _component_q_tab_panels = vue.resolveComponent("q-tab-panels");
    var _component_q_card = vue.resolveComponent("q-card");

    return (vue.openBlock(), vue.createBlock(_component_q_card, { class: "ResponsiveSpacing" }, {
      default: vue.withCtx(function () { return [
        vue.createVNode(_component_q_tabs, {
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($data.tab) = $event); }),
          dense: "",
          "active-color": "primary",
          "indicator-color": "primary",
          align: "justify"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab, {
              name: "xs",
              label: "xs"
            }),
            vue.createVNode(_component_q_tab, {
              name: "sm",
              label: "sm"
            }),
            vue.createVNode(_component_q_tab, {
              name: "md",
              label: "md"
            }),
            vue.createVNode(_component_q_tab, {
              name: "lg",
              label: "lg"
            }),
            vue.createVNode(_component_q_tab, {
              name: "xl",
              label: "xl"
            })
          ]; }),
          _: 1
        }, 8, ["modelValue"]),
        vue.createVNode(_component_q_separator),
        vue.createVNode(_component_q_tab_panels, {
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return (($data.tab) = $event); }),
          animated: ""
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab_panel, { name: "xs" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_margin_and_padding, {
                  value: $options.localSpacing.xs,
                  "onUpdate:value": _cache[1] || (_cache[1] = function ($event) { return (($options.localSpacing.xs) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "sm" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_margin_and_padding, {
                  value: $options.localSpacing.sm,
                  "onUpdate:value": _cache[2] || (_cache[2] = function ($event) { return (($options.localSpacing.sm) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "md" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_margin_and_padding, {
                  value: $options.localSpacing.md,
                  "onUpdate:value": _cache[3] || (_cache[3] = function ($event) { return (($options.localSpacing.md) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "lg" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_margin_and_padding, {
                  value: $options.localSpacing.lg,
                  "onUpdate:value": _cache[4] || (_cache[4] = function ($event) { return (($options.localSpacing.lg) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "xl" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_margin_and_padding, {
                  value: $options.localSpacing.xl,
                  "onUpdate:value": _cache[5] || (_cache[5] = function ($event) { return (($options.localSpacing.xl) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        }, 8, ["modelValue"])
      ]; }),
      _: 1
    }))
  }

  script$a.render = render$a;

  var script$9 = {
    name: "ActionPanel",
    props: {
      action: {
        type: Object,
        default: function () {
        }
      },
    },
    data: function data() {
      return {
        actionOptions: ['scroll', 'link', 'event'],
      }
    },
    computed: {
      localOptions: {
        get: function get() {
          return this.action
        },
        set: function set(newValue) {
          this.$emit('update:action', newValue);
        }
      }
    },
  };

  var _hoisted_1$6 = { class: "row q-col-gutter-sm" };
  var _hoisted_2$4 = { class: "col-md-2" };
  var _hoisted_3$4 = {
    key: 0,
    class: "input-container col-md-2"
  };
  var _hoisted_4$4 = {
    key: 1,
    class: "input-container col-md-8"
  };
  var _hoisted_5$3 = {
    key: 2,
    class: "input-container col-md-8"
  };
  var _hoisted_6$3 = {
    key: 3,
    class: "input-container col-md-4"
  };
  var _hoisted_7$3 = {
    key: 4,
    class: "input-container col-md-4"
  };

  function render$9(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_checkbox = vue.resolveComponent("q-checkbox");
    var _component_q_select = vue.resolveComponent("q-select");
    var _component_q_input = vue.resolveComponent("q-input");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
      vue.createElementVNode("div", _hoisted_2$4, [
        vue.createVNode(_component_q_checkbox, {
          modelValue: $options.localOptions.hasAction,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($options.localOptions.hasAction) = $event); }),
          "left-label": "",
          label: "has action"
        }, null, 8, ["modelValue"])
      ]),
      ($options.localOptions.hasAction)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$4, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localOptions.actionName,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($options.localOptions.actionName) = $event); }),
              options: $data.actionOptions
            }, null, 8, ["modelValue", "options"])
          ]))
        : vue.createCommentVNode("", true),
      ($options.localOptions.actionName === 'scroll')
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$4, [
            vue.createVNode(_component_q_input, {
              modelValue: $options.localOptions.scrollTo,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($options.localOptions.scrollTo) = $event); }),
              label: "scrollTo"
            }, null, 8, ["modelValue"])
          ]))
        : vue.createCommentVNode("", true),
      ($options.localOptions.actionName === 'link')
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$3, [
            vue.createVNode(_component_q_input, {
              modelValue: $options.localOptions.route,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return (($options.localOptions.route) = $event); }),
              label: "route"
            }, null, 8, ["modelValue"])
          ]))
        : vue.createCommentVNode("", true),
      ($options.localOptions.actionName === 'event')
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$3, [
            vue.createVNode(_component_q_input, {
              modelValue: $options.localOptions.eventName,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) { return (($options.localOptions.eventName) = $event); }),
              label: "eventName"
            }, null, 8, ["modelValue"])
          ]))
        : vue.createCommentVNode("", true),
      ($options.localOptions.actionName === 'event')
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$3, [
            vue.createVNode(_component_q_input, {
              modelValue: $options.localOptions.eventArgs,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($options.localOptions.eventArgs) = $event); }),
              label: "eventArgs"
            }, null, 8, ["modelValue"])
          ]))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$9.render = render$9;

  var script$8 = {
    name: 'OptionPanelTabs',
    components: {
      BorderStyle: script$g,
      BoxShadows: script$h,
      HoverEffects: script$f,
      ResponsiveShow: script$e,
      ResponsiveSpacing: script$a,
      StyleTabComponent: script$b,
      ActionPanel: script$9
    },
    props: {
      showStyleTab: {
        type: Boolean,
        default: true
      },
      showBorderStyleTab: {
        type: Boolean,
        default: false
      },
      showResponsiveSpacing: {
        type: Boolean,
        default: false
      },
      showBoxShadowsTab: {
        type: Boolean,
        default: false
      },
      showHoverEffectsTab: {
        type: Boolean,
        default: false
      },
      showResponsiveShow: {
        type: Boolean,
        default: false
      },
      showActionTab: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: function () {
        }
      }
    },
    data: function data() {
      return {
        tab: 'main'
      }
    },
    computed: {
      localOptions: {
        get: function get() {
          return this.getDefaultOptions(this.options)
        },
        set: function set(newValue) {
          console.log(newValue);
          this.$emit('update:options', newValue);
        }
      }
    },
    methods: {
      getDefaultOptions: function getDefaultOptions (options) {
        if (!options.style) {
          options.style = {};
        }
        return options
      }
    }
  };

  function render$8(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_tab = vue.resolveComponent("q-tab");
    var _component_q_tabs = vue.resolveComponent("q-tabs");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_q_tab_panel = vue.resolveComponent("q-tab-panel");
    var _component_style_tab_component = vue.resolveComponent("style-tab-component");
    var _component_hover_effects = vue.resolveComponent("hover-effects");
    var _component_responsive_show = vue.resolveComponent("responsive-show");
    var _component_box_shadows = vue.resolveComponent("box-shadows");
    var _component_border_style = vue.resolveComponent("border-style");
    var _component_responsive_spacing = vue.resolveComponent("responsive-spacing");
    var _component_action_panel = vue.resolveComponent("action-panel");
    var _component_q_tab_panels = vue.resolveComponent("q-tab-panels");
    var _component_q_card = vue.resolveComponent("q-card");

    return (vue.openBlock(), vue.createBlock(_component_q_card, null, {
      default: vue.withCtx(function () { return [
        vue.createVNode(_component_q_tabs, {
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($data.tab) = $event); }),
          dense: "",
          "active-color": "primary",
          "indicator-color": "primary",
          align: "justify"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab, {
              name: "main",
              label: "main"
            }),
            ($props.showStyleTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 0,
                  name: "style",
                  label: "style"
                }))
              : vue.createCommentVNode("", true),
            ($props.showHoverEffectsTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 1,
                  name: "HoverEffects",
                  label: "HoverEffects"
                }))
              : vue.createCommentVNode("", true),
            ($props.showResponsiveShow)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 2,
                  name: "ResponsiveShow",
                  label: "ResponsiveShow"
                }))
              : vue.createCommentVNode("", true),
            ($props.showBoxShadowsTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 3,
                  name: "BoxShadows",
                  label: "BoxShadows"
                }))
              : vue.createCommentVNode("", true),
            ($props.showBorderStyleTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 4,
                  name: "Border",
                  label: "Border"
                }))
              : vue.createCommentVNode("", true),
            ($props.showResponsiveSpacing)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 5,
                  name: "ResponsiveSpacing",
                  label: "ResponsiveSpacing"
                }))
              : vue.createCommentVNode("", true),
            ($props.showActionTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab, {
                  key: 6,
                  name: "ActionPanel",
                  label: "ActionPanel"
                }))
              : vue.createCommentVNode("", true)
          ]; }),
          _: 1
        }, 8, ["modelValue"]),
        vue.createVNode(_component_q_separator),
        vue.createVNode(_component_q_tab_panels, {
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) { return (($data.tab) = $event); }),
          animated: ""
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab_panel, { name: "main" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_q_input, {
                  modelValue: $options.localOptions.className,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($options.localOptions.className) = $event); }),
                  label: "className"
                }, null, 8, ["modelValue"]),
                vue.renderSlot(_ctx.$slots, "main-tab", { options: $options.localOptions })
              ]; }),
              _: 3
            }),
            ($props.showStyleTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 0,
                  name: "style"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_style_tab_component, {
                      styles: $options.localOptions.style,
                      "onUpdate:styles": _cache[2] || (_cache[2] = function ($event) { return (($options.localOptions.style) = $event); })
                    }, {
                      backgroundImageSrcInput: vue.withCtx(function () { return [
                        vue.renderSlot(_ctx.$slots, "backgroundImageSrcInput")
                      ]; }),
                      _: 3
                    }, 8, ["styles"])
                  ]; }),
                  _: 3
                }))
              : vue.createCommentVNode("", true),
            ($props.showHoverEffectsTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 1,
                  name: "HoverEffects"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_hover_effects, {
                      "css-hover-effects": $options.localOptions.cssHoverEffects,
                      "onUpdate:cssHoverEffects": _cache[3] || (_cache[3] = function ($event) { return (($options.localOptions.cssHoverEffects) = $event); })
                    }, null, 8, ["css-hover-effects"])
                  ]; }),
                  _: 1
                }))
              : vue.createCommentVNode("", true),
            ($props.showResponsiveShow)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 2,
                  name: "ResponsiveShow"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_responsive_show, {
                      "responsive-show": $options.localOptions.responsiveShow,
                      "onUpdate:responsiveShow": _cache[4] || (_cache[4] = function ($event) { return (($options.localOptions.responsiveShow) = $event); })
                    }, null, 8, ["responsive-show"])
                  ]; }),
                  _: 1
                }))
              : vue.createCommentVNode("", true),
            ($props.showBoxShadowsTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 3,
                  name: "BoxShadows"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_box_shadows, {
                      "box-shadows": $options.localOptions.boxShadows,
                      "onUpdate:boxShadows": _cache[5] || (_cache[5] = function ($event) { return (($options.localOptions.boxShadows) = $event); })
                    }, null, 8, ["box-shadows"])
                  ]; }),
                  _: 1
                }))
              : vue.createCommentVNode("", true),
            ($props.showBorderStyleTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 4,
                  name: "Border"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_border_style, {
                      "border-style": $options.localOptions.borderStyle,
                      "onUpdate:borderStyle": _cache[6] || (_cache[6] = function ($event) { return (($options.localOptions.borderStyle) = $event); })
                    }, null, 8, ["border-style"])
                  ]; }),
                  _: 1
                }))
              : vue.createCommentVNode("", true),
            ($props.showResponsiveSpacing)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 5,
                  name: "ResponsiveSpacing"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_responsive_spacing, {
                      spacing: $options.localOptions.responsiveSpacing,
                      "onUpdate:spacing": _cache[7] || (_cache[7] = function ($event) { return (($options.localOptions.responsiveSpacing) = $event); })
                    }, null, 8, ["spacing"])
                  ]; }),
                  _: 1
                }))
              : vue.createCommentVNode("", true),
            ($props.showActionTab)
              ? (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                  key: 6,
                  name: "ActionPanel"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_action_panel, {
                      action: $options.localOptions.action,
                      "onUpdate:action": _cache[8] || (_cache[8] = function ($event) { return (($options.localOptions.action) = $event); })
                    }, null, 8, ["action"])
                  ]; }),
                  _: 1
                }))
              : vue.createCommentVNode("", true)
          ]; }),
          _: 3
        }, 8, ["modelValue"])
      ]; }),
      _: 3
    }))
  }

  script$8.render = render$8;

  var components$1 = {};
  var script$7 = {
    name: 'Background',
    components: components$1,
    props: {
      value: {
        default: function () {
          return {}
        },
        type: Object
      }
    },
    setup: function setup () {
      var $q = quasar.useQuasar();
      if ($q.$pageBuilderWidgetOptionPanelImageUploader) {
        components$1.BackgroundImageSrcInput = $q.$pageBuilderWidgetOptionPanelImageUploader;
      }

      var hasBackgroundImageSrcInputComponent = function () {
        return !!$q.$pageBuilderWidgetOptionPanelImageUploader
      };

      return {
        hasBackgroundImageSrcInputComponent: hasBackgroundImageSrcInputComponent
      }
    },
    computed: {
      localValue: {
        get: function get () {
          return this.value
        },
        set: function set (newValue) {
          this.$emit('update:value', newValue);
        }
      }
    }
  };

  var _hoisted_1$5 = { class: "row q-col-gutter-md" };
  var _hoisted_2$3 = { class: "col-md-6" };
  var _hoisted_3$3 = { class: "row" };
  var _hoisted_4$3 = { class: "col-12" };
  var _hoisted_5$2 = { class: "col-md-12" };
  var _hoisted_6$2 = { class: "col-md-12" };
  var _hoisted_7$2 = { class: "col-md-6" };
  var _hoisted_8$2 = { class: "row" };
  var _hoisted_9$1 = { class: "col-12" };
  var _hoisted_10$1 = { class: "col-md-12" };
  var _hoisted_11$1 = { class: "col-md-12" };

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_color = vue.resolveComponent("q-color");
    var _component_q_popup_proxy = vue.resolveComponent("q-popup-proxy");
    var _component_q_icon = vue.resolveComponent("q-icon");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_q_select = vue.resolveComponent("q-select");
    var _component_BackgroundImageSrcInput = vue.resolveComponent("BackgroundImageSrcInput");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
      vue.createElementVNode("div", _hoisted_2$3, [
        vue.createElementVNode("div", _hoisted_3$3, [
          vue.createElementVNode("div", _hoisted_4$3, [
            vue.createVNode(_component_q_input, {
              modelValue: $options.localValue.color,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($options.localValue.color) = $event); }),
              label: "backgroundColor"
            }, {
              append: vue.withCtx(function () { return [
                vue.createVNode(_component_q_icon, {
                  name: "colorize",
                  class: "cursor-pointer"
                }, {
                  default: vue.withCtx(function () { return [
                    vue.createVNode(_component_q_popup_proxy, {
                      cover: "",
                      "transition-show": "scale",
                      "transition-hide": "scale"
                    }, {
                      default: vue.withCtx(function () { return [
                        vue.createVNode(_component_q_color, {
                          modelValue: $options.localValue.color,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($options.localValue.color) = $event); }),
                          label: "backgroundColor",
                          "default-value": 'rgba(34,255,0,0.72)',
                          "format-model": "rgba"
                        }, null, 8, ["modelValue", "default-value"])
                      ]; }),
                      _: 1
                    })
                  ]; }),
                  _: 1
                })
              ]; }),
              _: 1
            }, 8, ["modelValue"])
          ]),
          vue.createElementVNode("div", _hoisted_5$2, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.repeat,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($options.localValue.repeat) = $event); }),
              label: "backgroundRepeat",
              options: [
                        'no-repeat',
                        'repeat',
                        'repeat-x',
                        'repeat-y',
                        'space',
                        'round',
                        'initial',
                        'inherit'
                      ]
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("div", _hoisted_6$2, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.attachment,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return (($options.localValue.attachment) = $event); }),
              label: "backgroundAttachment",
              options: [
                        'scroll',
                        'fixed',
                        'local',
                        'initial',
                        'inherit'
                      ]
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      vue.createElementVNode("div", _hoisted_7$2, [
        vue.createElementVNode("div", _hoisted_8$2, [
          vue.createElementVNode("div", _hoisted_9$1, [
            vue.renderSlot(_ctx.$slots, "backgroundImageSrcInput", {}, function () { return [
              ($setup.hasBackgroundImageSrcInputComponent())
                ? (vue.openBlock(), vue.createBlock(_component_BackgroundImageSrcInput, {
                    key: 0,
                    value: $options.localValue.image,
                    "onUpdate:value": _cache[4] || (_cache[4] = function ($event) { return (($options.localValue.image) = $event); })
                  }, null, 8, ["value"]))
                : (vue.openBlock(), vue.createBlock(_component_q_input, {
                    key: 1,
                    modelValue: $options.localValue.image,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return (($options.localValue.image) = $event); }),
                    label: "backgroundImage"
                  }, null, 8, ["modelValue"]))
            ]; })
          ]),
          vue.createElementVNode("div", _hoisted_10$1, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.position,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return (($options.localValue.position) = $event); }),
              label: "backgroundPosition",
              options: [
                        'center center',
                        'center top',
                        'center bottom',
                        'left top',
                        'left center',
                        'left bottom',
                        'right top',
                        'right center',
                        'right bottom'
                      ]
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("div", _hoisted_11$1, [
            vue.createVNode(_component_q_select, {
              modelValue: $options.localValue.size,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) { return (($options.localValue.size) = $event); }),
              label: "backgroundSize",
              options: [
                        'cover',
                        'contain',
                        'inherit',
                        'initial',
                        'revert',
                        'revert-layer',
                        'unset'
                      ]
            }, null, 8, ["modelValue"])
          ])
        ])
      ])
    ]))
  }

  script$7.render = render$7;

  var script$6 = {
    name: 'ResponsiveBackGround',
    components: {
      BackgroundComponent: script$7
    },
    props: {
      options: {
        type: Object,
        default: function () {
        }
      }
    },
    data: function data() {
      return {
        tab: 'md',
        defaultOptions: {
          xl: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          lg: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          md: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          sm: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          xs: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          }
        }
      }
    },
    computed: {
      localOptions: {
        get: function get() {
          return Object.assign(this.defaultOptions, this.options)
        },
        set: function set(newValue) {
          this.$emit('update:options', newValue);
        }
      }
    },
    methods: {
      getDefaultOptions: function getDefaultOptions (options) {
        if (!options.style) {
          options.style = {};
        }
        return options
      }
    }
  };

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_tab = vue.resolveComponent("q-tab");
    var _component_q_tabs = vue.resolveComponent("q-tabs");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_background_component = vue.resolveComponent("background-component");
    var _component_q_tab_panel = vue.resolveComponent("q-tab-panel");
    var _component_q_tab_panels = vue.resolveComponent("q-tab-panels");
    var _component_q_card = vue.resolveComponent("q-card");

    return (vue.openBlock(), vue.createBlock(_component_q_card, { class: "ResponsiveBackGround" }, {
      default: vue.withCtx(function () { return [
        vue.createVNode(_component_q_tabs, {
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($data.tab) = $event); }),
          dense: "",
          "active-color": "primary",
          "indicator-color": "primary",
          align: "justify"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab, {
              name: "xs",
              label: "xs"
            }),
            vue.createVNode(_component_q_tab, {
              name: "sm",
              label: "sm"
            }),
            vue.createVNode(_component_q_tab, {
              name: "md",
              label: "md"
            }),
            vue.createVNode(_component_q_tab, {
              name: "lg",
              label: "lg"
            }),
            vue.createVNode(_component_q_tab, {
              name: "xl",
              label: "xl"
            })
          ]; }),
          _: 1
        }, 8, ["modelValue"]),
        vue.createVNode(_component_q_separator),
        vue.createVNode(_component_q_tab_panels, {
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return (($data.tab) = $event); }),
          animated: ""
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab_panel, { name: "xs" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_background_component, {
                  value: $options.localOptions.xs,
                  "onUpdate:value": _cache[1] || (_cache[1] = function ($event) { return (($options.localOptions.xs) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "sm" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_background_component, {
                  value: $options.localOptions.sm,
                  "onUpdate:value": _cache[2] || (_cache[2] = function ($event) { return (($options.localOptions.sm) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "md" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_background_component, {
                  value: $options.localOptions.md,
                  "onUpdate:value": _cache[3] || (_cache[3] = function ($event) { return (($options.localOptions.md) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "lg" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_background_component, {
                  value: $options.localOptions.lg,
                  "onUpdate:value": _cache[4] || (_cache[4] = function ($event) { return (($options.localOptions.lg) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_tab_panel, { name: "xl" }, {
              default: vue.withCtx(function () { return [
                vue.createVNode(_component_background_component, {
                  value: $options.localOptions.xl,
                  "onUpdate:value": _cache[5] || (_cache[5] = function ($event) { return (($options.localOptions.xl) = $event); })
                }, null, 8, ["value"])
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        }, 8, ["modelValue"])
      ]; }),
      _: 1
    }))
  }

  script$6.render = render$6;

  var script$5 = vue.defineComponent({
    name: 'ColOptionPanel',
    components: { ResponsiveBackGround: script$6, OptionPanelTabs: script$8 },
    mixins: [OptionPanel],
    data: function () {
      return {
        sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
        sizeValue: {},
        responsiveOrderTab: 'md',
        defaultOptions: JSON.parse(JSON.stringify(defaultOptions$2))
      }
    },
    created: function created () {
      this.updateSizeValueFromOptionsColNumber();
    },
    methods: {
      calcColNumberClass: function calcColNumberClass () {
        var this$1$1 = this;

        this.localOptions.colNumber = Object.keys(this.sizeValue).map(function (key) { return this$1$1.getCol(key, this$1$1.sizeValue[key]); }).join(' ');
      },
      updateSizeValueFromOptionsColNumber: function updateSizeValueFromOptionsColNumber () {
        var this$1$1 = this;

        if (typeof this.localOptions.colNumber !== 'string') {
          return
        }
        this.localOptions.colNumber.split(' ').forEach(function (className) {
          var target = this$1$1.getSizeFromClass(className);
          if (target) {
            this$1$1.sizeValue[target.size] = target.value;
          }
        });
      },
      getSizeFromClass: function getSizeFromClass (className) {
        var target = null;
        var value = null;
        this.sizes.forEach(function (size) {
          if (className.includes('-' + size + '-')) {
            target = size;
            value = className.replace('col-', '').replace(size + '-', '');
          }
        });

        if (target) {
          return { size: target, value: value }
        }

        return null
      },
      getCol: function getCol (size, number) {
        if (!size) {
          return ''
        }
        return 'col-' + size + '-' + number
      }
    }
  });

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_item_section = vue.resolveComponent("q-item-section");
    var _component_q_slider = vue.resolveComponent("q-slider");
    var _component_q_item = vue.resolveComponent("q-item");
    var _component_q_list = vue.resolveComponent("q-list");
    var _component_q_expansion_item = vue.resolveComponent("q-expansion-item");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_responsive_back_ground = vue.resolveComponent("responsive-back-ground");
    var _component_option_panel_tabs = vue.resolveComponent("option-panel-tabs");

    return (vue.openBlock(), vue.createBlock(_component_option_panel_tabs, {
      options: _ctx.localOptions,
      "onUpdate:options": _cache[1] || (_cache[1] = function ($event) { return ((_ctx.localOptions) = $event); }),
      "show-border-style-tab": true,
      "show-box-shadows-tab": true,
      "show-hover-effects-tab": true,
      "show-responsive-show": true
    }, {
      "main-tab": vue.withCtx(function () { return [
        vue.createVNode(_component_q_expansion_item, {
          "expand-separator": "",
          label: "Responsive Grid"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_list, { bordered: "" }, {
              default: vue.withCtx(function () { return [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sizes, function (size) {
                  return (vue.openBlock(), vue.createBlock(_component_q_item, { key: size }, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_item_section, { avatar: "" }, {
                        default: vue.withCtx(function () { return [
                          vue.createTextVNode(vue.toDisplayString(size), 1)
                        ]; }),
                        _: 2
                      }, 1024),
                      vue.createVNode(_component_q_item_section, null, {
                        default: vue.withCtx(function () { return [
                          vue.createVNode(_component_q_slider, {
                            modelValue: _ctx.sizeValue[size],
                            "onUpdate:modelValue": [function ($event) { return ((_ctx.sizeValue[size]) = $event); }, _ctx.calcColNumberClass],
                            min: 1,
                            max: 12,
                            step: 1,
                            "label-value": _ctx.sizeValue[size] ? (_ctx.sizeValue[size] + '/12') : 0,
                            label: "",
                            color: "light-green"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label-value"])
                        ]; }),
                        _: 2
                      }, 1024)
                    ]; }),
                    _: 2
                  }, 1024))
                }), 128))
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        }),
        vue.createVNode(_component_q_expansion_item, {
          "expand-separator": "",
          label: "Responsive Order"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_list, { bordered: "" }, {
              default: vue.withCtx(function () { return [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sizes, function (size) {
                  return (vue.openBlock(), vue.createBlock(_component_q_item, { key: size }, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_item_section, { avatar: "" }, {
                        default: vue.withCtx(function () { return [
                          vue.createTextVNode(vue.toDisplayString(size), 1)
                        ]; }),
                        _: 2
                      }, 1024),
                      vue.createVNode(_component_q_item_section, null, {
                        default: vue.withCtx(function () { return [
                          vue.createVNode(_component_q_input, {
                            modelValue: _ctx.localOptions.responsiveOrder[size],
                            "onUpdate:modelValue": function ($event) { return ((_ctx.localOptions.responsiveOrder[size]) = $event); },
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]; }),
                        _: 2
                      }, 1024)
                    ]; }),
                    _: 2
                  }, 1024))
                }), 128))
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        }),
        vue.createVNode(_component_q_expansion_item, {
          "expand-separator": "",
          label: "Responsive BackGround"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_responsive_back_ground, {
              options: _ctx.localOptions.backgrounds,
              "onUpdate:options": _cache[0] || (_cache[0] = function ($event) { return ((_ctx.localOptions.backgrounds) = $event); })
            }, null, 8, ["options"])
          ]; }),
          _: 1
        })
      ]; }),
      _: 1
    }, 8, ["options"]))
  }

  script$5.render = render$5;

  var script$4 = vue.defineComponent({
    name: 'RowOptionPanel',
    components: { ResponsiveBackGround: script$6, OptionPanelTabs: script$8 },
    mixins: [OptionPanel],
    data: function data() {
      return {
        useGutter: true,
        sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
        isAbsolute: false,
        absoluteOptions: [
          {
            label: 'top',
            value: 'top'
          },
          {
            label: 'right',
            value: 'right'
          },
          {
            label: 'bottom',
            value: 'bottom'
          },
          {
            label: 'left',
            value: 'left'
          }
        ],
        alignmentOptions: {
          justifyContent: {
            global: [
              null,
              'justify-start',
              'justify-center',
              'justify-end',
              'justify-between',
              'justify-around',
              'justify-evenly'
            ],
            xl: [
              null,
              'justify-xl-start',
              'justify-xl-center',
              'justify-xl-end',
              'justify-xl-between',
              'justify-xl-around',
              'justify-xl-evenly'
            ],
            lg: [
              null,
              'justify-lg-start',
              'justify-lg-center',
              'justify-lg-end',
              'justify-lg-between',
              'justify-lg-around',
              'justify-lg-evenly'
            ],
            md: [
              null,
              'justify-md-start',
              'justify-md-center',
              'justify-md-end',
              'justify-md-between',
              'justify-md-around',
              'justify-md-evenly'
            ],
            sm: [
              null,
              'justify-sm-start',
              'justify-sm-center',
              'justify-sm-end',
              'justify-sm-between',
              'justify-sm-around',
              'justify-sm-evenly'
            ],
            xs: [
              null,
              'justify-xs-start',
              'justify-xs-center',
              'justify-xs-end',
              'justify-xs-between',
              'justify-xs-around',
              'justify-xs-evenly'
            ]
          },
          alignItems: {
            global: [
              null,
              'items-start',
              'items-center',
              'items-end',
              'items-baseline',
              'items-stretch'
            ],
            xl: [
              null,
              'items-xl-start',
              'items-xl-center',
              'items-xl-end',
              'items-xl-baseline',
              'items-xl-stretch'
            ],
            lg: [
              null,
              'items-lg-start',
              'items-lg-center',
              'items-lg-end',
              'items-lg-baseline',
              'items-lg-stretch'
            ],
            md: [
              null,
              'items-md-start',
              'items-md-center',
              'items-md-end',
              'items-md-baseline',
              'items-md-stretch'
            ],
            sm: [
              null,
              'items-sm-start',
              'items-sm-center',
              'items-sm-end',
              'items-sm-baseline',
              'items-sm-stretch'
            ],
            xs: [
              null,
              'items-xs-start',
              'items-xs-center',
              'items-xs-end',
              'items-xs-baseline',
              'items-xs-stretch'
            ]
          },
          alignContent: {
            global: [
              null,
              'content-start',
              'content-center',
              'content-end',
              'content-between',
              'content-around',
              'content-stretch'
            ],
            xl: [
              null,
              'content-xl-start',
              'content-xl-center',
              'content-xl-end',
              'content-xl-between',
              'content-xl-around',
              'content-xl-stretch'
            ],
            lg: [
              null,
              'content-lg-start',
              'content-lg-center',
              'content-lg-end',
              'content-lg-between',
              'content-lg-around',
              'content-lg-stretch'
            ],
            md: [
              null,
              'content-md-start',
              'content-md-center',
              'content-md-end',
              'content-md-between',
              'content-md-around',
              'content-md-stretch'
            ],
            sm: [
              null,
              'content-sm-start',
              'content-sm-center',
              'content-sm-end',
              'content-sm-between',
              'content-sm-around',
              'content-sm-stretch'
            ],
            xs: [
              null,
              'content-xs-start',
              'content-xs-center',
              'content-xs-end',
              'content-xs-between',
              'content-xs-around',
              'content-xs-stretch'
            ]
          }
        },
        defaultOptions: JSON.parse(JSON.stringify(defaultOptions$1))
      }
    },
    watch: {
      isAbsolute: function isAbsolute (newValue) {
        if (!newValue) {
          this.localOptions.absolute = 'none';
        } else {
          this.localOptions.absolute = 'top';
        }
      },
      useGutter: function useGutter (newValue) {
        this.localOptions.gutterXSize = newValue ? 'md' : null;
        this.localOptions.gutterYSize = newValue ? 'md' : null;
        this.updateLocalOptions(this.localOptions);
      }
    }
  });

  var _hoisted_1$4 = { class: "option-panel-container" };
  var _hoisted_2$2 = { class: "row q-col-gutter-md" };
  var _hoisted_3$2 = { class: "col-md-3" };
  var _hoisted_4$2 = {
    key: 0,
    class: "col-md-9"
  };
  var _hoisted_5$1 = { class: "row q-col-gutter-md" };
  var _hoisted_6$1 = { class: "col-md-6" };
  var _hoisted_7$1 = { class: "col-md-6" };
  var _hoisted_8$1 = {
    key: 0,
    class: "row q-col-gutter-md"
  };
  var _hoisted_9 = { class: "col-12" };
  var _hoisted_10 = { class: "col-md-6 col-12" };
  var _hoisted_11 = { class: "col-md-6 col-12" };
  var _hoisted_12 = { class: "col-12" };
  var _hoisted_13 = { class: "col-12" };
  var _hoisted_14 = { class: "col-12" };
  var _hoisted_15 = { class: "col-12" };
  var _hoisted_16 = { class: "col-12" };
  var _hoisted_17 = { class: "row" };
  var _hoisted_18 = { class: "col-md-3" };
  var _hoisted_19 = { class: "col-md-9 q-mt-sm" };
  var _hoisted_20 = { class: "row q-col-gutter-md" };
  var _hoisted_21 = { class: "col-md-12 col-12" };
  var _hoisted_22 = { class: "col-md-3 col-12" };
  var _hoisted_23 = { class: "col-md-3 col-12" };
  var _hoisted_24 = { class: "col-md-3 col-12" };
  var _hoisted_25 = { class: "col-md-3 col-12" };
  var _hoisted_26 = { class: "col-md-3 col-12" };
  var _hoisted_27 = { class: "row q-col-gutter-md" };
  var _hoisted_28 = { class: "col-md-12 col-12" };
  var _hoisted_29 = { class: "col-md-3 col-12" };
  var _hoisted_30 = { class: "col-md-3 col-12" };
  var _hoisted_31 = { class: "col-md-3 col-12" };
  var _hoisted_32 = { class: "col-md-3 col-12" };
  var _hoisted_33 = { class: "col-md-3 col-12" };
  var _hoisted_34 = { class: "row q-col-gutter-md" };
  var _hoisted_35 = { class: "col-md-12 col-12" };
  var _hoisted_36 = { class: "col-md-3 col-12" };
  var _hoisted_37 = { class: "col-md-3 col-12" };
  var _hoisted_38 = { class: "col-md-3 col-12" };
  var _hoisted_39 = { class: "col-md-3 col-12" };
  var _hoisted_40 = { class: "col-md-3 col-12" };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_checkbox = vue.resolveComponent("q-checkbox");
    var _component_q_select = vue.resolveComponent("q-select");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");
    var _component_q_expansion_item = vue.resolveComponent("q-expansion-item");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_q_option_group = vue.resolveComponent("q-option-group");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_q_list = vue.resolveComponent("q-list");
    var _component_responsive_back_ground = vue.resolveComponent("responsive-back-ground");
    var _component_option_panel_tabs = vue.resolveComponent("option-panel-tabs");

    return (vue.openBlock(), vue.createBlock(_component_option_panel_tabs, {
      options: _ctx.localOptions,
      "onUpdate:options": _cache[33] || (_cache[33] = function ($event) { return ((_ctx.localOptions) = $event); }),
      "show-border-style-tab": true,
      "show-box-shadows-tab": true,
      "show-hover-effects-tab": true,
      "show-responsive-spacing": true,
      "show-responsive-show": true
    }, {
      "main-tab": vue.withCtx(function () { return [
        vue.createElementVNode("div", _hoisted_1$4, [
          vue.createVNode(_component_q_list, null, {
            default: vue.withCtx(function () { return [
              vue.createVNode(_component_q_expansion_item, {
                "expand-separator": "",
                label: "Gutter"
              }, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_card_section, null, {
                        default: vue.withCtx(function () { return [
                          vue.createElementVNode("div", _hoisted_2$2, [
                            vue.createElementVNode("div", _hoisted_3$2, [
                              vue.createVNode(_component_q_checkbox, {
                                modelValue: _ctx.useGutter,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return ((_ctx.useGutter) = $event); }),
                                label: "Gutter"
                              }, null, 8, ["modelValue"])
                            ]),
                            (_ctx.useGutter)
                              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, [
                                  vue.createElementVNode("div", _hoisted_5$1, [
                                    vue.createElementVNode("div", _hoisted_6$1, [
                                      vue.createVNode(_component_q_select, {
                                        modelValue: _ctx.localOptions.gutterXSize,
                                        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ((_ctx.localOptions.gutterXSize) = $event); }),
                                        label: "Gutter Horizontal",
                                        options: _ctx.sizes
                                      }, null, 8, ["modelValue", "options"])
                                    ]),
                                    vue.createElementVNode("div", _hoisted_7$1, [
                                      vue.createVNode(_component_q_select, {
                                        modelValue: _ctx.localOptions.gutterYSize,
                                        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return ((_ctx.localOptions.gutterYSize) = $event); }),
                                        label: "Gutter Vertical",
                                        options: _ctx.sizes
                                      }, null, 8, ["modelValue", "options"])
                                    ])
                                  ])
                                ]))
                              : vue.createCommentVNode("", true)
                          ])
                        ]; }),
                        _: 1
                      })
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              }),
              vue.createVNode(_component_q_expansion_item, {
                "expand-separator": "",
                label: "Boxed"
              }, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_card_section, null, {
                        default: vue.withCtx(function () { return [
                          vue.createVNode(_component_q_checkbox, {
                            modelValue: _ctx.localOptions.boxed,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return ((_ctx.localOptions.boxed) = $event); }),
                            label: "Boxed"
                          }, null, 8, ["modelValue"]),
                          (_ctx.localOptions.boxed)
                            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$1, [
                                vue.createElementVNode("div", _hoisted_9, [
                                  vue.createVNode(_component_q_checkbox, {
                                    modelValue: _ctx.localOptions.responsiveBoxedWidth,
                                    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) { return ((_ctx.localOptions.responsiveBoxedWidth) = $event); }),
                                    label: "ResponsiveBoxedWidth"
                                  }, null, 8, ["modelValue"])
                                ]),
                                (!_ctx.localOptions.responsiveBoxedWidth)
                                  ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                      vue.createElementVNode("div", _hoisted_10, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.boxedWidth,
                                          "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) { return ((_ctx.localOptions.boxedWidth) = $event); }),
                                          hint: "just number in px",
                                          label: "boxedWidth"
                                        }, null, 8, ["modelValue"])
                                      ]),
                                      vue.createElementVNode("div", _hoisted_11, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.paddingOfBoxedInFullWidth,
                                          "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) { return ((_ctx.localOptions.paddingOfBoxedInFullWidth) = $event); }),
                                          hint: "use when box is in full width state (always use with units like px)",
                                          label: "PaddingOfBoxedState"
                                        }, null, 8, ["modelValue"])
                                      ])
                                    ], 64))
                                  : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                                      vue.createElementVNode("div", _hoisted_12, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.responsiveBoxedWidths.xs.width,
                                          "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) { return ((_ctx.localOptions.responsiveBoxedWidths.xs.width) = $event); }),
                                          hint: "just number in px",
                                          label: "boxedWidth (xs)"
                                        }, null, 8, ["modelValue"])
                                      ]),
                                      vue.createElementVNode("div", _hoisted_13, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.responsiveBoxedWidths.sm.width,
                                          "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) { return ((_ctx.localOptions.responsiveBoxedWidths.sm.width) = $event); }),
                                          hint: "just number in px",
                                          label: "boxedWidth (sm)"
                                        }, null, 8, ["modelValue"])
                                      ]),
                                      vue.createElementVNode("div", _hoisted_14, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.responsiveBoxedWidths.md.width,
                                          "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) { return ((_ctx.localOptions.responsiveBoxedWidths.md.width) = $event); }),
                                          hint: "just number in px",
                                          label: "boxedWidth (md)"
                                        }, null, 8, ["modelValue"])
                                      ]),
                                      vue.createElementVNode("div", _hoisted_15, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.responsiveBoxedWidths.lg.width,
                                          "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) { return ((_ctx.localOptions.responsiveBoxedWidths.lg.width) = $event); }),
                                          hint: "just number in px",
                                          label: "boxedWidth (lg)"
                                        }, null, 8, ["modelValue"])
                                      ]),
                                      vue.createElementVNode("div", _hoisted_16, [
                                        vue.createVNode(_component_q_input, {
                                          modelValue: _ctx.localOptions.responsiveBoxedWidths.xl.width,
                                          "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) { return ((_ctx.localOptions.responsiveBoxedWidths.xl.width) = $event); }),
                                          hint: "just number in px",
                                          label: "boxedWidth (xl)"
                                        }, null, 8, ["modelValue"])
                                      ])
                                    ], 64))
                              ]))
                            : vue.createCommentVNode("", true)
                        ]; }),
                        _: 1
                      })
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              }),
              vue.createVNode(_component_q_expansion_item, {
                "expand-separator": "",
                label: "Absolute"
              }, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_card_section, null, {
                        default: vue.withCtx(function () { return [
                          vue.createElementVNode("div", _hoisted_17, [
                            vue.createElementVNode("div", _hoisted_18, [
                              vue.createVNode(_component_q_checkbox, {
                                modelValue: _ctx.isAbsolute,
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) { return ((_ctx.isAbsolute) = $event); }),
                                label: "Absolute"
                              }, null, 8, ["modelValue"])
                            ]),
                            vue.createElementVNode("div", _hoisted_19, [
                              (_ctx.isAbsolute)
                                ? (vue.openBlock(), vue.createBlock(_component_q_option_group, {
                                    key: 0,
                                    modelValue: _ctx.defaultOptions.absolute,
                                    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) { return ((_ctx.defaultOptions.absolute) = $event); }),
                                    options: _ctx.absoluteOptions,
                                    color: "primary",
                                    inline: "",
                                    dense: ""
                                  }, null, 8, ["modelValue", "options"]))
                                : vue.createCommentVNode("", true)
                            ])
                          ])
                        ]; }),
                        _: 1
                      })
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              }),
              vue.createVNode(_component_q_expansion_item, {
                "expand-separator": "",
                label: "Alignment"
              }, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_card, null, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_card_section, null, {
                        default: vue.withCtx(function () { return [
                          vue.createVNode(_component_q_list, null, {
                            default: vue.withCtx(function () { return [
                              vue.createVNode(_component_q_expansion_item, {
                                "expand-separator": "",
                                label: "Justify Content"
                              }, {
                                default: vue.withCtx(function () { return [
                                  vue.createVNode(_component_q_card, null, {
                                    default: vue.withCtx(function () { return [
                                      vue.createVNode(_component_q_card_section, null, {
                                        default: vue.withCtx(function () { return [
                                          vue.createElementVNode("div", _hoisted_20, [
                                            vue.createElementVNode("div", _hoisted_21, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.justifyContent.global,
                                                "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) { return ((_ctx.localOptions.alignment.justifyContent.global) = $event); }),
                                                label: "Justify Content",
                                                options: _ctx.alignmentOptions.justifyContent.global
                                              }, null, 8, ["modelValue", "options"]),
                                              vue.createVNode(_component_q_separator)
                                            ]),
                                            vue.createElementVNode("div", _hoisted_22, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.justifyContent.xl,
                                                "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) { return ((_ctx.localOptions.alignment.justifyContent.xl) = $event); }),
                                                label: "Justify Content (xl)",
                                                options: _ctx.alignmentOptions.justifyContent.xl
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_23, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.justifyContent.lg,
                                                "onUpdate:modelValue": _cache[16] || (_cache[16] = function ($event) { return ((_ctx.localOptions.alignment.justifyContent.lg) = $event); }),
                                                label: "Justify Content (lg)",
                                                options: _ctx.alignmentOptions.justifyContent.lg
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_24, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.justifyContent.md,
                                                "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) { return ((_ctx.localOptions.alignment.justifyContent.md) = $event); }),
                                                label: "Justify Content (md)",
                                                options: _ctx.alignmentOptions.justifyContent.md
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_25, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.justifyContent.sm,
                                                "onUpdate:modelValue": _cache[18] || (_cache[18] = function ($event) { return ((_ctx.localOptions.alignment.justifyContent.sm) = $event); }),
                                                label: "Justify Content (sm)",
                                                options: _ctx.alignmentOptions.justifyContent.sm
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_26, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.justifyContent.xs,
                                                "onUpdate:modelValue": _cache[19] || (_cache[19] = function ($event) { return ((_ctx.localOptions.alignment.justifyContent.xs) = $event); }),
                                                label: "Justify Content (xs)",
                                                options: _ctx.alignmentOptions.justifyContent.xs
                                              }, null, 8, ["modelValue", "options"])
                                            ])
                                          ])
                                        ]; }),
                                        _: 1
                                      })
                                    ]; }),
                                    _: 1
                                  })
                                ]; }),
                                _: 1
                              }),
                              vue.createVNode(_component_q_expansion_item, {
                                "expand-separator": "",
                                label: "Align Items"
                              }, {
                                default: vue.withCtx(function () { return [
                                  vue.createVNode(_component_q_card, null, {
                                    default: vue.withCtx(function () { return [
                                      vue.createVNode(_component_q_card_section, null, {
                                        default: vue.withCtx(function () { return [
                                          vue.createElementVNode("div", _hoisted_27, [
                                            vue.createElementVNode("div", _hoisted_28, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignItems.global,
                                                "onUpdate:modelValue": _cache[20] || (_cache[20] = function ($event) { return ((_ctx.localOptions.alignment.alignItems.global) = $event); }),
                                                label: "Align Items",
                                                options: _ctx.alignmentOptions.alignItems.global
                                              }, null, 8, ["modelValue", "options"]),
                                              vue.createVNode(_component_q_separator)
                                            ]),
                                            vue.createElementVNode("div", _hoisted_29, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignItems.xl,
                                                "onUpdate:modelValue": _cache[21] || (_cache[21] = function ($event) { return ((_ctx.localOptions.alignment.alignItems.xl) = $event); }),
                                                label: "Align Items (xl)",
                                                options: _ctx.alignmentOptions.alignItems.xl
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_30, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignItems.lg,
                                                "onUpdate:modelValue": _cache[22] || (_cache[22] = function ($event) { return ((_ctx.localOptions.alignment.alignItems.lg) = $event); }),
                                                label: "Align Items (lg)",
                                                options: _ctx.alignmentOptions.alignItems.lg
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_31, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignItems.md,
                                                "onUpdate:modelValue": _cache[23] || (_cache[23] = function ($event) { return ((_ctx.localOptions.alignment.alignItems.md) = $event); }),
                                                label: "Align Items (md)",
                                                options: _ctx.alignmentOptions.alignItems.md
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_32, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignItems.sm,
                                                "onUpdate:modelValue": _cache[24] || (_cache[24] = function ($event) { return ((_ctx.localOptions.alignment.alignItems.sm) = $event); }),
                                                label: "Align Items (sm)",
                                                options: _ctx.alignmentOptions.alignItems.sm
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_33, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignItems.xs,
                                                "onUpdate:modelValue": _cache[25] || (_cache[25] = function ($event) { return ((_ctx.localOptions.alignment.alignItems.xs) = $event); }),
                                                label: "Align Items (xs)",
                                                options: _ctx.alignmentOptions.alignItems.xs
                                              }, null, 8, ["modelValue", "options"])
                                            ])
                                          ])
                                        ]; }),
                                        _: 1
                                      })
                                    ]; }),
                                    _: 1
                                  })
                                ]; }),
                                _: 1
                              }),
                              vue.createVNode(_component_q_expansion_item, {
                                "expand-separator": "",
                                label: "Align Content"
                              }, {
                                default: vue.withCtx(function () { return [
                                  vue.createVNode(_component_q_card, null, {
                                    default: vue.withCtx(function () { return [
                                      vue.createVNode(_component_q_card_section, null, {
                                        default: vue.withCtx(function () { return [
                                          vue.createElementVNode("div", _hoisted_34, [
                                            vue.createElementVNode("div", _hoisted_35, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignContent.global,
                                                "onUpdate:modelValue": _cache[26] || (_cache[26] = function ($event) { return ((_ctx.localOptions.alignment.alignContent.global) = $event); }),
                                                label: "Align Content",
                                                options: _ctx.alignmentOptions.alignContent.global
                                              }, null, 8, ["modelValue", "options"]),
                                              vue.createVNode(_component_q_separator)
                                            ]),
                                            vue.createElementVNode("div", _hoisted_36, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignContent.xl,
                                                "onUpdate:modelValue": _cache[27] || (_cache[27] = function ($event) { return ((_ctx.localOptions.alignment.alignContent.xl) = $event); }),
                                                label: "Align Content (xl)",
                                                options: _ctx.alignmentOptions.alignContent.xl
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_37, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignContent.lg,
                                                "onUpdate:modelValue": _cache[28] || (_cache[28] = function ($event) { return ((_ctx.localOptions.alignment.alignContent.lg) = $event); }),
                                                label: "Align Content (lg)",
                                                options: _ctx.alignmentOptions.alignContent.lg
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_38, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignContent.md,
                                                "onUpdate:modelValue": _cache[29] || (_cache[29] = function ($event) { return ((_ctx.localOptions.alignment.alignContent.md) = $event); }),
                                                label: "Align Content (md)",
                                                options: _ctx.alignmentOptions.alignContent.md
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_39, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignContent.sm,
                                                "onUpdate:modelValue": _cache[30] || (_cache[30] = function ($event) { return ((_ctx.localOptions.alignment.alignContent.sm) = $event); }),
                                                label: "Align Content (sm)",
                                                options: _ctx.alignmentOptions.alignContent.sm
                                              }, null, 8, ["modelValue", "options"])
                                            ]),
                                            vue.createElementVNode("div", _hoisted_40, [
                                              vue.createVNode(_component_q_select, {
                                                modelValue: _ctx.localOptions.alignment.alignContent.xs,
                                                "onUpdate:modelValue": _cache[31] || (_cache[31] = function ($event) { return ((_ctx.localOptions.alignment.alignContent.xs) = $event); }),
                                                label: "Align Content (xs)",
                                                options: _ctx.alignmentOptions.alignContent.xs
                                              }, null, 8, ["modelValue", "options"])
                                            ])
                                          ])
                                        ]; }),
                                        _: 1
                                      })
                                    ]; }),
                                    _: 1
                                  })
                                ]; }),
                                _: 1
                              })
                            ]; }),
                            _: 1
                          })
                        ]; }),
                        _: 1
                      })
                    ]; }),
                    _: 1
                  })
                ]; }),
                _: 1
              }),
              vue.createVNode(_component_q_expansion_item, {
                "expand-separator": "",
                label: "ResponsiveBackGround"
              }, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_responsive_back_ground, {
                    options: _ctx.localOptions.backgrounds,
                    "onUpdate:options": _cache[32] || (_cache[32] = function ($event) { return ((_ctx.localOptions.backgrounds) = $event); })
                  }, null, 8, ["options"])
                ]; }),
                _: 1
              })
            ]; }),
            _: 1
          })
        ])
      ]; }),
      _: 1
    }, 8, ["options"]))
  }

  script$4.render = render$4;

  var script$3 = vue.defineComponent({
    name: 'SectionOptionPanel',
    components: { OptionPanelTabs: script$8, ResponsiveBackGround: script$6 },
    mixins: [OptionPanel],
    data: function () {
      return {
        useFullHeight: false,
        defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
      }
    },
    watch: {
      useFullHeight: function useFullHeight (newValue) {
        this.defaultOptions.fullHeight = newValue;
      }
    },
    created: function created () {
      var this$1$1 = this;

      var oldFullHeight = this.localOptions.fullHeight;
      this.useFullHeight = !!this.localOptions.fullHeight;
      this.$nextTick(function () {
        this$1$1.localOptions.fullHeight = oldFullHeight;
      });
    }
  });

  var _hoisted_1$3 = { class: "option-panel-container" };
  var _hoisted_2$1 = { class: "row" };
  var _hoisted_3$1 = { class: "col-md-4" };
  var _hoisted_4$1 = { class: "col-md-4" };
  var _hoisted_5 = { class: "col-md-4" };
  var _hoisted_6 = { class: "row" };
  var _hoisted_7 = { class: "col-12" };
  var _hoisted_8 = { class: "col-12" };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_checkbox = vue.resolveComponent("q-checkbox");
    var _component_q_input = vue.resolveComponent("q-input");
    var _component_q_select = vue.resolveComponent("q-select");
    var _component_q_separator = vue.resolveComponent("q-separator");
    var _component_q_banner = vue.resolveComponent("q-banner");
    var _component_responsive_back_ground = vue.resolveComponent("responsive-back-ground");
    var _component_option_panel_tabs = vue.resolveComponent("option-panel-tabs");

    return (vue.openBlock(), vue.createBlock(_component_option_panel_tabs, {
      options: _ctx.localOptions,
      "onUpdate:options": _cache[4] || (_cache[4] = function ($event) { return ((_ctx.localOptions) = $event); }),
      "show-border-style-tab": true,
      "show-box-shadows-tab": true,
      "show-hover-effects-tab": true,
      "show-responsive-spacing": true,
      "show-responsive-show": true
    }, {
      "main-tab": vue.withCtx(function () { return [
        vue.createElementVNode("div", _hoisted_1$3, [
          vue.createElementVNode("div", _hoisted_2$1, [
            vue.createElementVNode("div", _hoisted_3$1, [
              vue.createVNode(_component_q_checkbox, {
                modelValue: _ctx.useFullHeight,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return ((_ctx.useFullHeight) = $event); }),
                label: "fullHeight"
              }, null, 8, ["modelValue"])
            ]),
            vue.createElementVNode("div", _hoisted_4$1, [
              (_ctx.useFullHeight)
                ? (vue.openBlock(), vue.createBlock(_component_q_input, {
                    key: 0,
                    modelValue: _ctx.localOptions.fullHeight,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ((_ctx.localOptions.fullHeight) = $event); }),
                    label: "FullHeight value"
                  }, null, 8, ["modelValue"]))
                : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("div", _hoisted_5, [
              (_ctx.useFullHeight)
                ? (vue.openBlock(), vue.createBlock(_component_q_select, {
                    key: 0,
                    modelValue: _ctx.localOptions.verticalAlign,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return ((_ctx.localOptions.verticalAlign) = $event); }),
                    label: "verticalAlign",
                    options: ['center', 'end', 'start']
                  }, null, 8, ["modelValue"]))
                : vue.createCommentVNode("", true)
            ])
          ]),
          vue.createElementVNode("div", _hoisted_6, [
            vue.createElementVNode("div", _hoisted_7, [
              vue.createVNode(_component_q_separator, { class: "q-mt-md q-mb-sm" }),
              vue.createTextVNode(" Background "),
              vue.createVNode(_component_q_banner, {
                dense: "",
                class: "bg-primary text-white"
              }, {
                default: vue.withCtx(function () { return [
                  vue.createTextVNode(" don't use background in style directly ")
                ]; }),
                _: 1
              })
            ]),
            vue.createElementVNode("div", _hoisted_8, [
              vue.createVNode(_component_responsive_back_ground, {
                options: _ctx.localOptions.backgrounds,
                "onUpdate:options": _cache[3] || (_cache[3] = function ($event) { return ((_ctx.localOptions.backgrounds) = $event); })
              }, null, 8, ["options"])
            ])
          ])
        ])
      ]; }),
      _: 1
    }, 8, ["options"]))
  }

  script$3.render = render$3;

  var script$2 = vue.defineComponent({
    name: 'ColOptionPanel',
    components: { OptionPanelTabs: script$8 },
    mixins: [OptionPanel]
  });

  var _hoisted_1$2 = /*#__PURE__*/vue.createElementVNode("div", { class: "option-panel-container" }, " page builder ... ", -1);

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_option_panel_tabs = vue.resolveComponent("option-panel-tabs");

    return (vue.openBlock(), vue.createBlock(_component_option_panel_tabs, {
      options: _ctx.localOptions,
      "onUpdate:options": _cache[0] || (_cache[0] = function ($event) { return ((_ctx.localOptions) = $event); })
    }, {
      "main-tab": vue.withCtx(function () { return [
        _hoisted_1$2
      ]; }),
      _: 1
    }, 8, ["options"]))
  }

  script$2.render = render$2;

  var components = {
    WidgetList: script$j,
    ColOptionPanel: script$5,
    RowOptionPanel: script$4,
    SectionOptionPanel: script$3,
    PageBuilderOptionPanel: script$2
  };

  var script$1 = vue.defineComponent({
    name: 'PageBuilderDialog',
    components: components,
    props: {
      show: {
        type: Boolean,
        default: false
      },
      actionType: {
        type: String,
        default: 'add'
      },
      widgetName: {
        type: String,
        default: null
      },
      widgetOptions: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    emits: ['closeDialog', 'addWidget', 'update:widgetOptions', 'update:show'],
    setup: function setup(props, ref$1) {
      var emit = ref$1.emit;

      var $q = quasar.useQuasar();
      if ($q.$pageBuilderWidgetOptionPanels) {
        Object.assign(components, $q.$pageBuilderWidgetOptionPanels);
      }

      var widgetExpanded = $q.$QPageBuilderWidgetList;

      var optionPanel = vue.ref('');
      var loadDynamicComponentForEditPanel = function () {
        var targetOptionPanel = widgetExpanded.find(function (widget) { return widget.name === props.widgetName; });
        if (props.widgetName === 'pageBuilder' || props.widgetName === 'section' || props.widgetName === 'row' || props.widgetName === 'col') {
          optionPanel.value = props.widgetName.charAt(0).toUpperCase() + props.widgetName.slice(1) + 'OptionPanel';
        } else if (targetOptionPanel && targetOptionPanel.optionPanel !== undefined) {
          optionPanel.value = targetOptionPanel.optionPanelName;
        } else {
          optionPanel.value = null;
        }
      };

      var close = function () {
        emit('closeDialog');
      };

      var setTab = function (event) {
        if (props.actionType === 'edit' && props.widgetName) {
          loadDynamicComponentForEditPanel();
        }
      };

      return {
        optionPanel: optionPanel,
        loadDynamicComponentForEditPanel: loadDynamicComponentForEditPanel,
        close: close,
        setTab: setTab
      }
    },
    computed: {
      showValue: {
        get: function get() {
          return this.show
        },
        set: function set(newValue) {
          this.$emit('update:show', newValue);
        }
      },
      localWidgetOptions: {
        get: function get() {
          return this.widgetOptions
        },
        set: function set(newValue) {
          this.$emit('update:widgetOptions', newValue);
        }
      }
    },
    methods: {
      onSelectWidget: function onSelectWidget (data) {
        this.$emit('addWidget', data);
      }
    }
  });

  var _hoisted_1$1 = { class: "header" };
  var _hoisted_2 = { class: "title" };
  var _hoisted_3 = { class: "close" };
  var _hoisted_4 = { key: 2 };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_widget_list = vue.resolveComponent("widget-list");
    var _component_q_card = vue.resolveComponent("q-card");
    var _component_q_dialog = vue.resolveComponent("q-dialog");

    return (vue.openBlock(), vue.createBlock(_component_q_dialog, {
      modelValue: _ctx.showValue,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ((_ctx.showValue) = $event); }),
      class: "quasar-page-builder-dialog",
      persistent: false,
      onBeforeShow: _ctx.setTab
    }, {
      default: vue.withCtx(function () { return [
        vue.createVNode(_component_q_card, { class: "quasar-page-builder-dialog-card" }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_card_section, null, {
              default: vue.withCtx(function () { return [
                vue.createElementVNode("div", _hoisted_1$1, [
                  vue.createElementVNode("div", _hoisted_2, [
                    (_ctx.actionType==='add')
                      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode(" widget list ")
                        ], 64))
                      : (_ctx.actionType==='edit')
                        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                            vue.createTextVNode(vue.toDisplayString(_ctx.optionPanel), 1)
                          ], 64))
                        : (_ctx.actionType==='import')
                          ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                              vue.createTextVNode(" import to " + vue.toDisplayString(_ctx.optionPanel), 1)
                            ], 64))
                          : vue.createCommentVNode("", true)
                  ]),
                  vue.createElementVNode("div", _hoisted_3, [
                    vue.createVNode(_component_q_btn, {
                      color: "primary",
                      icon: "close",
                      onClick: _ctx.close
                    }, null, 8, ["onClick"])
                  ])
                ])
              ]; }),
              _: 1
            }),
            vue.createVNode(_component_q_card_section, null, {
              default: vue.withCtx(function () { return [
                (_ctx.actionType==='edit' && _ctx.optionPanel)
                  ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.optionPanel), {
                      key: 0,
                      options: _ctx.localWidgetOptions,
                      "onUpdate:options": _cache[0] || (_cache[0] = function ($event) { return ((_ctx.localWidgetOptions) = $event); })
                    }, null, 40, ["options"]))
                  : (_ctx.actionType==='add' && _ctx.widgetName==='col')
                    ? (vue.openBlock(), vue.createBlock(_component_widget_list, {
                        key: 1,
                        onSelectWidget: _ctx.onSelectWidget
                      }, null, 8, ["onSelectWidget"]))
                    : (_ctx.actionType==='import')
                      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4))
                      : vue.createCommentVNode("", true)
              ]; }),
              _: 1
            })
          ]; }),
          _: 1
        })
      ]; }),
      _: 1
    }, 8, ["modelValue", "onBeforeShow"]))
  }

  script$1.render = render$1;

  var script = {
    name: 'QPageBuilder',
    components: {
      EditorBox: script$n,
      OptionPanelDialog: script$1,
      PageBuilderSection: script$l
    },
    mixins: [mixinWidget],
    props: {
      sections: {
        type: Array,
        default: function () { return []; }
      },
      options: {
        type: Object,
        default: function () {
          return {}
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: false
      },
      preview: {
        type: Boolean,
        default: false
      }
    },
    emits: ['toggleEdit', 'update:options', 'exported', 'notExported'],
    data: function data() {
      return {
        localDragStatus: null,
        optionPanelDialog: false,
        selectedNode: {
          event: null,
          name: null,
          widget: {
            options: {}
          }
        }
      }
    },
    computed: {
      pageBuilderEditable: {
        get: function get() {
          return this.editable
        },
        set: function set(newValue) {
          this.$emit('update:editable', newValue);
        }
      },
      pageBuilderSections: {
        get: function get() {
          return this.sections
        },
        set: function set(newValue) {
          this.$emit('update:sections', newValue);
        }
      },
      pageBuilderOptions: {
        get: function get() {
          return Object.assign(this.defaultOptions, this.options)
        },
        set: function set(newValue) {
          this.$emit('update:options', newValue);
        }
      },
      pageBuilderClassName: function pageBuilderClassName() {
        return 'page-builder ' + this.pageBuilderOptions.className
      }
    },
    watch: {
      pageBuilderOptions: {
        handler: function handler() {
          this.updateClassName();
        },
        deep: true
      },
      editable: function editable () {
        this.updateClassName();
      }
    },
    created: function created() {
      this.updateClassName();
    },
    methods: {
      updateClassName: function updateClassName () {
        this.pageBuilderOptions.className = this.getUpdateClassNamesWithKey(this.pageBuilderOptions.className, 'editable', this.editable);
      },
      getWidgetNameFromTagName: function getWidgetNameFromTagName(tagName) {
        var regex = /-./gms;
        return tagName.slice(0, 1).toUpperCase() + tagName.slice(1).replace(regex, function (match) {
          return match.replace('-', '').toUpperCase()
        })
      },
      getNodeByPath: function getNodeByPath(path, nodesData, callback) {
        var result = null;
        var parent = null;
        var index = null;
        if (path.node !== 'data.rows') {
          parent = nodesData[path.node];
          index = path.index;
          result = parent[index];
        } else {
          parent = nodesData.data.rows;
          index = path.index;
          result = parent[index];
        }

        if (path.child) {
          return this.getNodeByPath(path.child, result, callback)
        }

        if (typeof callback === 'function') {
          callback(parent, result, index);
        }
        return result
      },
      setNodeName: function setNodeName(node) {
        if (node.name) {
          return
        }
        node.name = this.getWidgetNameFromTagName(node.widget.name);
      },
      setOptionPanelData: function setOptionPanelData(selectedNode, selectedSection) {
        selectedNode.path.index = selectedSection.widgetIndex;
        this.selectedNode = selectedNode;
        if (!this.selectedNode.widget) {
          this.selectedNode.widget = {};
        }
        if (!selectedNode || !selectedNode.widget || !selectedNode.widget.options) {
          selectedNode.widget.options = {};
        }
        this.selectedNode.widget.options = selectedNode.widget.options;
        // this.selectedNode.widget.options = selectedNode?.widget?.options ? selectedNode.widget.options : {}
      },
      onPageBuilderEdit: function onPageBuilderEdit(event) {
        if (event === 'add') {
          this.pageBuilderSections.push({
            data: {
              rows: []
            }
          });
          return
        }
        if (event === 'export') {
          this.copyExportedConfig(this.pageBuilderSections);
          return
        }
        if (event === 'import') {
          var sections = prompt('data: ', '');
          if (sections != null) {
            this.pageBuilderSections = JSON.parse(sections);
          }
          return
        }
        this.selectedNode.event = event;
        this.selectedNode.name = 'pageBuilder';
        this.selectedNode.widget.name = 'pageBuilder';
        this.selectedNode.widget.options = this.pageBuilderOptions;
        this.optionPanelDialog = true;
      },
      copyExportedConfig: function copyExportedConfig (config) {
        var this$1$1 = this;

        quasar.copyToClipboard(JSON.stringify(config))
          .then(function () {
            this$1$1.$emit('exported', config);
            if (this$1$1.$q.notify) {
              this$1$1.$q.notify({
                message: 'Copied to the clipboard!',
                type: 'positive'
              });
            }
          })
          .catch(function () {
            this$1$1.$emit('notExported', config);
            if (this$1$1.$q.notify) {
              this$1$1.$q.notify({
                type: 'negative',
                message: 'Could not copy!'
              });
            }
          });
      },
      onAddWidget: function onAddWidget (widget) {
        this.actionOnSelectedNode(function (parent, node, index) {
          // const widgetName = widget.name[0].toLowerCase() + widget.name.slice(1, widget.name.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
          var widgetName = widget.name;
          node.widgets.push({
            name: widgetName
          });
        });
      },
      onDrag: function onDrag (dragStatus) {
        this.localDragStatus = dragStatus;
      },
      onOptionAction: function onOptionAction(selectedNode, selectedSection) {
        var this$1$1 = this;

        this.setNodeName(selectedNode);
        this.setOptionPanelData(selectedNode, selectedSection);
        this.actionOnSelectedNode(function (parent, node, index) {
          if (selectedNode.event === 'add') {
            if (selectedNode.name === 'section') {
              node.data.rows.push({
                cols: []
              });
            } else if (selectedNode.name === 'row') {
              node.cols.push({
                widgets: []
              });
            } else if (selectedNode.name === 'col') {
              this$1$1.optionPanelDialog = true;
            }
          } else if (selectedNode.event === 'edit') {
            this$1$1.selectedNode.widget = node;
            this$1$1.optionPanelDialog = true;
          } else if (selectedNode.event === 'delete') {
            parent.splice(index, 1);
          } else if (selectedNode.event === 'duplicate') {
            parent.splice(index, 0, JSON.parse(JSON.stringify(node)));
          } else if (selectedNode.event === 'export') {
            this$1$1.copyExportedConfig(node);
          } else if (selectedNode.event === 'import') {
            var newNode = prompt('data: ', '');
            if (newNode != null) {
              var newNodeObject = JSON.parse(newNode);
              if (selectedNode.name === 'section') {
                node.data.rows = newNodeObject.data.rows;
                node.options = newNodeObject.options;
              } else if (selectedNode.name === 'row') {
                node.cols = newNodeObject.cols;
                node.options = newNodeObject.options;
              } else if (selectedNode.name === 'col') {
                node.widgets = newNodeObject.widgets;
                node.options = newNodeObject.options;
              } else {
                node.options = newNodeObject.options;
              }
            }
          }
        });
      },
      actionOnSelectedNode: function actionOnSelectedNode(callback) {
        this.actionOnNode(this.selectedNode, callback);
      },
      actionOnNode: function actionOnNode(node, callback) {
        this.getNodeByPath(node.path, { widgets: this.pageBuilderSections }, callback);
      },
      onSubmitElement: function onSubmitElement(widget) {
        if (this.selectedNode.event === 'edit') {
          this.actionOnSelectedNode(function (parent, node, index) {
            node.options = widget.options;
          });
        }
      },
      toggleEdit: function toggleEdit () {
        this.$emit('toggleEdit');
      }
    }
  };

  var _hoisted_1 = { class: "PageBuilderLoading" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_editor_box = vue.resolveComponent("editor-box");
    var _component_page_builder_section = vue.resolveComponent("page-builder-section");
    var _component_option_panel_dialog = vue.resolveComponent("option-panel-dialog");
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_spinner_grid = vue.resolveComponent("q-spinner-grid");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass($options.pageBuilderClassName),
      style: vue.normalizeStyle($options.pageBuilderOptions.style)
    }, [
      (!$props.loading)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            ($options.pageBuilderEditable)
              ? (vue.openBlock(), vue.createBlock(_component_editor_box, {
                  key: 0,
                  label: "page-builder",
                  "show-delete": false,
                  "show-duplicate": false,
                  onCallAction: $options.onPageBuilderEdit
                }, null, 8, ["onCallAction"]))
              : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.pageBuilderSections, function (section, sectionIndex) {
              return (vue.openBlock(), vue.createBlock(_component_page_builder_section, {
                key: sectionIndex,
                data: section.data,
                "onUpdate:data": function ($event) { return ((section.data) = $event); },
                options: section.options,
                "onUpdate:options": function ($event) { return ((section.options) = $event); },
                editable: $options.pageBuilderEditable,
                "drag-status": $data.localDragStatus,
                onOnOptionAction: function ($event) { return ($options.onOptionAction($event, {widget: section, widgetIndex: sectionIndex, name: 'section'})); },
                onOnDrag: $options.onDrag
              }, null, 8, ["data", "onUpdate:data", "options", "onUpdate:options", "editable", "drag-status", "onOnOptionAction", "onOnDrag"]))
            }), 128)),
            vue.createVNode(_component_option_panel_dialog, {
              "widget-options": $data.selectedNode.widget.options,
              "onUpdate:widgetOptions": _cache[0] || (_cache[0] = function ($event) { return (($data.selectedNode.widget.options) = $event); }),
              show: $data.optionPanelDialog,
              "onUpdate:show": _cache[1] || (_cache[1] = function ($event) { return (($data.optionPanelDialog) = $event); }),
              "action-type": $data.selectedNode.event,
              "widget-name": $data.selectedNode.name,
              onCloseDialog: _cache[2] || (_cache[2] = function ($event) { return ($data.optionPanelDialog = false); }),
              onSubmit: $options.onSubmitElement,
              onAddWidget: $options.onAddWidget
            }, null, 8, ["widget-options", "show", "action-type", "widget-name", "onSubmit", "onAddWidget"]),
            ($props.preview)
              ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                  key: 1,
                  color: "primary",
                  icon: $options.pageBuilderEditable ? 'preview' : 'data_array',
                  class: "btn-toggle-edit-page-builder",
                  onClick: $options.toggleEdit
                }, null, 8, ["icon", "onClick"]))
              : vue.createCommentVNode("", true)
          ], 64))
        : vue.renderSlot(_ctx.$slots, "loading", { key: 1 }, function () { return [
            vue.createElementVNode("div", _hoisted_1, [
              vue.createVNode(_component_q_spinner_grid, {
                color: "primary",
                size: "3em"
              })
            ])
          ]; })
    ], 6))
  }

  script.render = render;
  script.__scopeId = "data-v-026242b1";

  function extractWidgets (json) {
    var widgets = [];
    json.children.forEach(function (element) {
      if (element.type === 'widget') {
        widgets.push(element);
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (element.hasOwnProperty('children')) {
          extractWidgets(element);
        }
      }
    });
    return widgets
  }

  var version = pkg.version;

  var install = function (app, widgetList) {
    var widgets = [];
    function extractWidgets (json) {
      json.children.forEach(function (element) {
        if (element.type === 'widget') {
          widgets.push(element);
        } else {
          // eslint-disable-next-line no-prototype-builtins
          if (element.hasOwnProperty('children')) {
            extractWidgets(element);
          }
        }
      });
    }
    extractWidgets(widgetList);
    var widgetExpanded = widgets;

    app.component(script.name, script);
    app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded;

    return widgetExpanded
    // async function registerWidgets (widgetsList) {
    //   const components = {}
    //   const optionPanels = {}
    //   const widgetsListLength = widgetsList.length
    //   for (let i = 0; i < widgetsListLength; i++) {
    //     const element = widgetsList[i]
    //     const widgetComponentName = element.name
    //     const widgetComponentPath = element.path + '/' + widgetComponentName
    //     const widgetOptionPanelPath = element.path + '/' + 'OptionPanel'
    //     const widgetComponentPathInArray = widgetComponentPath.split('/')
    //
    //     if (widgetComponentPathInArray[widgetComponentPathInArray.length - 1] !== widgetComponentPathInArray[widgetComponentPathInArray.length - 2]) {
    //       continue
    //     }
    //     // :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :(
    //     // https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
    //     if (widgetComponentPathInArray.length === 1) {
    //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}.vue`)).default
    //     }
    //     if (widgetComponentPathInArray.length === 2) {
    //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}.vue`)).default
    //     }
    //     if (widgetComponentPathInArray.length === 3) {
    //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}.vue`)).default
    //     }
    //     if (widgetComponentPathInArray.length === 4) {
    //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}.vue`)).default
    //     }
    //     if (widgetComponentPathInArray.length === 5) {
    //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}/${widgetComponentPathInArray[4]}.vue`)).default
    //     }
    //     if (widgetComponentPathInArray.length === 6) {
    //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}/${widgetComponentPathInArray[4]}/${widgetComponentPathInArray[5]}.vue`)).default
    //     }
    //     // https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
    //     // :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :(
    //
    //     if (element.optionPanel) {
    //       optionPanels[widgetComponentName] = {
    //         name: widgetComponentName,
    //         tagName: widgetComponentName[0].toLowerCase() + widgetComponentName.slice(1, widgetComponentName.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`),
    //         path: '../' + widgetOptionPanelPath + '.vue'
    //       }
    //     }
    //   }
    //
    //   app.config.globalProperties.$q.$pageBuilderWidgetComponents = components
    //   app.config.globalProperties.$q.$pageBuilderWidgetOptionPanels = optionPanels
    // }
    //
    // await registerWidgets(widgetExpanded)
  };

  var VuePlugin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    OptionPanelTabs: script$8,
    QPageBuilder: script,
    extractWidgets: extractWidgets,
    install: install,
    mixinOptionPanel: OptionPanel,
    mixinWidget: mixinWidget,
    version: version
  });

  return VuePlugin;

}));
