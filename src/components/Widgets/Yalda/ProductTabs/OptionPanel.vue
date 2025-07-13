<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true">
    <template #main-tab>
      <div class="option-panel-container">
        <q-btn label="افزودن"
               color="secondary"
               class="q-my-sm"
               @click="addTab" />
        <div v-for="(tab, index) in localOptions.tabs"
             :key="index">
          <q-expansion-item expand-separator>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="build" />
              </q-item-section>

              <q-item-section>
                {{ 'tab-' + (index + 1) }}
              </q-item-section>

              <q-item-section side>
                <q-btn color="negative"
                       flat
                       square
                       icon="delete"
                       @click="deleteTab(index)" />
              </q-item-section>
            </template>
            <q-expansion-item expand-separator
                              icon="title"
                              :label="'Title '">
              <text-widget-option-panel v-model:options="tab.title" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="description"
                              :label="'description '">
              <text-widget-option-panel v-model:options="tab.description" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:scroll"
                              label="scroll to">
              <q-input v-model="tab.scrollTo"
                       label="class name" />
            </q-expansion-item>
          </q-expansion-item>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import textWidgetOptionPanel from 'components/Widgets/TextWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    textWidgetOptionPanel
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        tabs: [
          {
            title: {
              text: 'راه ابریشم',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            description: {
              text: 'دوازدهم',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            scrollTo: ''
          },
          {
            title: {
              text: 'چتر نجات',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            description: {
              text: 'فارغ التحصیلان',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            scrollTo: ''
          },
          {
            title: {
              text: 'شلیک نهایی',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            description: {
              text: 'امتحانات نهایی',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            scrollTo: ''
          },
          {
            title: {
              text: 'سه آ',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            description: {
              text: 'تمامی پایه ها',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            scrollTo: ''
          },
          {
            title: {
              text: 'هفتانه',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            description: {
              text: 'یازدهم (به زودی)',
              fontFamily: null,
              color: null,
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              responsiveShow: {
                xl: true,
                lg: true,
                md: true,
                sm: true,
                xs: true
              },
              xs: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              sm: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              md: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              lg: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
              },
              xl: {
                fontSize: null,
                fontWeight: null,
                fontStyle: null,
                lineHeight: null,
                letterSpacing: null
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
              hasTheme: null,
              activeTheme: 'default',
              themes: {
                theme1: {
                  borderColor: null,
                  borderSize: null,
                  borderWidth: null,
                  borderHeight: null,
                  top: null,
                  left: null,
                  bottom: null,
                  right: null
                }
              }
            },
            scrollTo: ''
          }
        ],
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
        }
      }
    }
  },
  methods: {
    addTab () {
      this.localOptions.tabs.push(
        {
          title: {
            text: '',
            fontFamily: null,
            color: null,
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            responsiveShow: {
              xl: true,
              lg: true,
              md: true,
              sm: true,
              xs: true
            },
            xs: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            sm: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            md: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            lg: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            xl: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
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
            hasTheme: null,
            activeTheme: 'default',
            themes: {
              theme1: {
                borderColor: null,
                borderSize: null,
                borderWidth: null,
                borderHeight: null,
                top: null,
                left: null,
                bottom: null,
                right: null
              }
            }
          },
          description: {
            text: '',
            fontFamily: null,
            color: null,
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            responsiveShow: {
              xl: true,
              lg: true,
              md: true,
              sm: true,
              xs: true
            },
            xs: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            sm: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            md: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            lg: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
            },
            xl: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null,
              letterSpacing: null
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
            hasTheme: null,
            activeTheme: 'default',
            themes: {
              theme1: {
                borderColor: null,
                borderSize: null,
                borderWidth: null,
                borderHeight: null,
                top: null,
                left: null,
                bottom: null,
                right: null
              }
            }
          },
          scrollTo: ''
        }
      )
    },
    deleteTab (index) {
      this.localOptions.tabs.splice(index, 1)
    }
  }
})
</script>
