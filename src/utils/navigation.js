import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../modules/_global/theme";
import { iconsMap, iconsLoaded } from './AppIcons';


defaultOptions = {
  layout: {
    direction: 'rtl', // Supported directions are: 'rtl', 'ltr'
    //backgroundColor: 'white',
    //orientation: ['portrait', 'landscape'] // An array of supported orientations
  },
  bottomTabs: {
    backgroundColor: colors.primaryBackGround//colors.primaryLight
  },
  bottomTab: {
    iconColor: colors.primaryBG,
    selectedIconColor: colors.primary,
    textColor: colors.primaryBG,
    selectedTextColor: colors.primary
  },
  animations: {
    setRoot: {
      enabled: 'true',// | 'false', // Optional, used to enable/disable the animation
      alpha: {
        from: 0,
        to: 1,
        duration: 1000,
        startDelay: 0,
        interpolation: 'accelerate'
      }
    },
    push: {
      enabled: 'true',
      alpha: {
        from: 0,
        to: 1,
        duration: 2000,
        startDelay: 0,
        interpolation: 'accelerate'
      }
    }
  },
  /*
  topBar: {
    leftButtons: [
      {
        id: 'openDrawer',
        icon: require('./signin.png')
      }
    ],
    rightButtons: [
      {
        id: 'openCamera',
        icon: require('./signin.png')
      }
    ]
  },*/
  topBar: {
    /*leftButtons: [
      {
        id: 'openDrawer',
        icon: iconsMap['ios-menu']//require('./signin.png')
      }
    ],
    rightButtons: [
      {
        id: 'openCamera',
        icon: iconsMap['ios-barcode']//require('./signin.png')
      }
    ],*/
    visible: false,
    animate: false, // Controls whether TopBar visibility changes should be animated
    hideOnScroll: false,
    buttonColor: colors.primary,
    drawBehind: true,
    testID: 'topBar',
    title: {
      text: 'Title',
      fontSize: 18,
      color: colors.primary,
      alignment: 'center'
      /*fontFamily: 'Helvetica',
      component: {
        name: 'example.CustomTopBarTitle',
        alignment: 'center'
      }
      */
    },
    /*
    subtitle: {
      text: 'Title',
      fontSize: 14,
      color: 'red',
      fontFamily: 'Helvetica',
      alignment: 'center'
    },
    */
    backButton: {
      //icon: require('./signin.png'),
      //visible: true
    },
    background: {
      color: colors.gray,//'#00ff00',
      /*component: {
        name: 'example.CustomTopBarBackground'
      }
      */
    },

  }
}
Navigation.setDefaultOptions(defaultOptions);

export const goToAuth = () => Navigation.setRoot({
  root: {
    sideMenu: {
      center: {
        stack: {
          id: 'AuthStack',
          children: [{
            bottomTabs: {
              id: 'AuthBottomTabs',
              children: [
                {
                  stack: {
                    id: 'SingInStack',
                    children: [
                      {
                        component: {
                          id: 'AuthBottonTabSignIn',
                          name: 'app.SignIn',
                          options: {
                            bottomTab: {
                              text: 'ورود',
                              fontSize: 14,
                              fontFamily:'IRANSansMobile',
                              icon: iconsMap['ios-log-in'],//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                },
                {
                  stack: {
                    id: 'SignUpStack',
                    children: [
                      {
                        component: {
                          id: 'AuthBottonTabSignUp',
                          name: 'app.SignUp',
                          options: {
                            bottomTab: {
                              text: 'ثبت‌نام',
                              fontSize: 14,
                              fontFamily:'IRANSansMobile',
                              icon: iconsMap['ios-person-add']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                  /*component: {
                    name: 'leaflet.Search',
                    options: {
                      bottomTab: {
                        text: 'Search',
                        fontSize: 12,
                        icon: iconsMap['ios-search']// require('../utils/signup.png')
                      }
                    }
                  }*/
                }
              ]
            }
          }],
          options: defaultOptions
        }
      },
      /*right: {
        component: {
          id: 'RightDrawer',
          name: 'leaflet.Camera',
          passProps: {
            text: 'This is a right side menu screen'
          }
        },
        width: 100,
        height: 100,
        //width: 30,
      }*/
    }
  }
})
export const goToAuth1 = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'AuthStack',
      children: [
        {
          component: {
            name: 'app.Auth',
            options: {
              /*bottomTab: {
                text: 'Sign Up',
                fontSize: 12,
                icon: iconsMap['ios-person-add']//require('./signup.png')
              }*/
            }
          },
        },
      ],
    }
  }
});

export const goHome2 = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'App',
      children: [
        {
          component: {
            name: 'app.Home',
            options: {
              bottomTab: {
                text: 'Home',
                fontSize: 12,
                icon: iconsMap['ios-home']//require('./signup.png')
              }
            }
          }
        }
      ],
    }
  }
})


export const goHome1 = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'AppStack',
      children: [
        {
          stack: {
            id: 'HomeStack',
            children: [
              {
                component: {
                  id: 'AppBottonTabHome',
                  name: 'app.Home',
                }
              }
            ],
            options: defaultOptions
          }
        },
      ]
    }
  }
});

export const goHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      center: {
        stack: {
          id: 'AppStack',
          children: [{
            bottomTabs: {
              id: 'AppBottomTabs',
              children: [
                {
                  stack: {
                    id: 'SchoolStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabSearch',
                          name: 'app.School',
                          options: {
                            bottomTab: {
                              text: 'دوره‌های من',
                              fontSize: 14,
                              fontFamily:'IRANSansMobile',
                              icon: iconsMap['ios-school']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                  /*component: {
                    name: 'leaflet.Search',
                    options: {
                      bottomTab: {
                        text: 'Search',
                        fontSize: 12,
                        icon: iconsMap['ios-search']// require('../utils/signup.png')
                      }
                    }
                  }*/
                },
                {
                  stack: {
                    id: 'HomeStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabHome',
                          name: 'app.Home',
                          options: {
                            bottomTab: {
                              text: 'لیست دوره ها',
                              fontSize: 14,
                              fontFamily:'IRANSansMobile',
                              icon: iconsMap['ios-cart'],//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                },
                /*{
                  stack: {
                    id: 'AboutStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabAbout',
                          name: 'app.About',
                          options: {
                            bottomTab: {
                              text: 'درباره‌ ما',
                              fontSize: 14,
                              fontFamily:'IRANSansMobile',
                              icon: iconsMap['ios-information-circle-outline']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                },
                {
                  stack: {
                    id: 'ProfileStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabProfile',
                          name: 'app.Profile',
                          options: {
                            bottomTab: {
                              text: 'پروفایل',
                              fontSize: 14,
                              fontFamily:'IRANSansMobile',
                              icon: iconsMap['ios-person']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                }*/
              ]
            }
          }],
          options: defaultOptions
        }
      },
      /*right: {
        component: {
          id: 'RightDrawer',
          name: 'leaflet.Camera',
          passProps: {
            text: 'This is a right side menu screen'
          }
        },
        width: 100,
        height: 100,
        //width: 30,
      }*/
    }
  }
});