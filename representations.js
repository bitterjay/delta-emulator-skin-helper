const getRepresentations = (console, screenSizes) => {
    return {
        iphone: {
            standard: {
                portrait: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.iphone?.standard?.portrait || [],
                    mappingSize: { width: 414, height: 736 },
                    extendedEdges: {}
                },
                landscape: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.iphone?.standard?.landscape || [],
                    mappingSize: { width: 736, height: 414 },
                    extendedEdges: {}
                }
            },
            edgeToEdge: {
                portrait: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.iphone?.edgeToEdge?.portrait || [],
                    mappingSize: { width: 430, height: 932 },
                    extendedEdges: {}
                },
                landscape: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.iphone?.edgeToEdge?.landscape || [],
                    mappingSize: { width: 932, height: 430 },
                    extendedEdges: {}
                }
            }
        },
        ipad: {
            standard: {
                portrait: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.ipad?.standard?.portrait || [],
                    mappingSize: { width: 1024, height: 1366 },
                    extendedEdges: {}
                },
                landscape: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.ipad?.standard?.landscape || [],
                    mappingSize: { width: 1366, height: 1024 },
                    extendedEdges: {}
                }
            },
            splitView: {
                portrait: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.ipad?.splitView?.portrait || [],
                    mappingSize: { width: 1024, height: 1366 },
                    extendedEdges: {}
                },
                landscape: {
                    assets: {},
                    items: [],
                    screens: screenSizes[console]?.ipad?.splitView?.landscape || [],
                    mappingSize: { width: 1366, height: 1024 },
                    extendedEdges: {}
                }
            }
        }
    };
};

export default getRepresentations;
