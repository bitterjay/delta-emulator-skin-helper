const screenSizes = {
    gbc: {
        iphone: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 0, "y": 0, "width": 414, "height": 373 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 138, "y": 0, "width": 460, "height": 414 }
                    }
                ]
            },
            edgeToEdge: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 0, "y": 59, "width": 430, "height": 387 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 227, "y": 0, "width": 478, "height": 430 }
                    }
                ]
            }
        },
        ipad: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1024, "height": 922 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 114, "y": 0, "width": 1137, "height": 1024 }
                    }
                ]
            },
            splitView: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1024, "height": 922 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 160, "height": 144 },
                        "outputFrame": { "x": 114, "y": 0, "width": 1137, "height": 1024 }
                    }
                ]
            }
        }
    },
    gba: {
        iphone: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 414, "height": 276 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 58, "y": 0, "width": 621, "height": 414 }
                    }
                ]
            },
            edgeToEdge: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 59, "width": 430, "height": 287 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 143, "y": 0, "width": 645, "height": 430 }
                    }
                ]
            }
        },
        ipad: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1024, "height": 683 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 96, "y": 116, "width": 1172, "height": 781 }
                    }
                ]
            },
            splitView: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1024, "height": 683 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 96, "y": 0, "width": 1172, "height": 781 }
                    }
                ]
            }
        }
    },
    ds: {
        iphone: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1080, "height": 720 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
                    }
                ]
            },
            edgeToEdge: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 59, "width": 430, "height": 287 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 645, "height": 430  }
                    }
                ]
            }
        },
        ipad: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1024, "height": 682 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 96, "y": 116, "width": 1172, "height": 782 }
                    }
                ]
            },
            splitView: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            }
        }
    },
    nes: {
        iphone: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1080, "height": 720 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
                    }
                ]
            },
            edgeToEdge: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 59, "width": 1242, "height": 2688 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2688, "height": 1242 }
                    }
                ]
            }
        },
        ipad: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            },
            splitView: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            }
        }
    },
    snes: {
        iphone: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1080, "height": 720 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
                    }
                ]
            },
            edgeToEdge: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 59, "width": 1242, "height": 2688 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2688, "height": 1242 }
                    }
                ]
            }
        },
        ipad: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            },
            splitView: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            }
        }
    },
    n64: {
        iphone: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1080, "height": 720 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
                    }
                ]
            },
            edgeToEdge: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 59, "width": 1242, "height": 2688 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2688, "height": 1242 }
                    }
                ]
            }
        },
        ipad: {
            standard: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            },
            splitView: {
                portrait: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2048, "height": 2732 }
                    }
                ],
                landscape: [
                    {
                        "inputFrame": { "x": 0, "y": 0, "width": 240, "height": 160 },
                        "outputFrame": { "x": 0, "y": 0, "width": 2732, "height": 2048 }
                    }
                ]
            }
        }
    }
};

export default screenSizes;
