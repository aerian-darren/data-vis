function chart1() {
    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(document.getElementById("main"), "dark");
    var option = {
        title: {
            text: "Top sellers",
        },
        tooltip: {},
        legend: {
            data: ["sales"],
        },
        xAxis: {
            data: [
                "Shirts",
                "Cardigans",
                "Chiffons",
                "Pants",
                "Heels",
                "Socks",
            ],
        },
        yAxis: {},
        series: [
            {
                name: "sales",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
}

function chart2(data) {
    var chartDom = document.getElementById("main2");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    option = {
        title: {
            text: "WORLD COFFEE RESEARCH SENSORY LEXICON",
            subtext:
                "Source: https://worldcoffeeresearch.org/work/sensory-lexicon/",
            textStyle: {
                fontSize: 14,
                align: "center",
            },
            subtextStyle: {
                align: "center",
            },
            sublink: "https://worldcoffeeresearch.org/work/sensory-lexicon/",
        },
        series: {
            type: "sunburst",
            data: data,
            radius: [0, "95%"],
            sort: undefined,
            emphasis: {
                focus: "ancestor",
            },
            levels: [
                {},
                {
                    r0: "15%",
                    r: "35%",
                    itemStyle: {
                        borderWidth: 2,
                    },
                    label: {
                        rotate: "tangential",
                    },
                },
                {
                    r0: "35%",
                    r: "70%",
                    label: {
                        align: "right",
                    },
                },
                {
                    r0: "70%",
                    r: "72%",
                    label: {
                        position: "outside",
                        padding: 3,
                        silent: false,
                    },
                    itemStyle: {
                        borderWidth: 3,
                    },
                },
            ],
        },
    };

    option && myChart.setOption(option);
}

function chart3(data) {
    var chartDom = document.getElementById("main3");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    run(data);
    function run(_rawData) {
        // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
        const countries = [
            "Finland",
            "France",
            "Germany",
            "Iceland",
            "Norway",
            "Poland",
            "Russia",
            "United Kingdom",
        ];
        const datasetWithFilters = [];
        const seriesList = [];
        echarts.util.each(countries, function (country) {
            var datasetId = "dataset_" + country;
            datasetWithFilters.push({
                id: datasetId,
                fromDatasetId: "dataset_raw",
                transform: {
                    type: "filter",
                    config: {
                        and: [
                            { dimension: "Year", gte: 1950 },
                            { dimension: "Country", "=": country },
                        ],
                    },
                },
            });
            seriesList.push({
                type: "line",
                datasetId: datasetId,
                showSymbol: false,
                name: country,
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.value[3] + ": " + params.value[0];
                    },
                },
                labelLayout: {
                    moveOverlap: "shiftY",
                },
                emphasis: {
                    focus: "series",
                },
                encode: {
                    x: "Year",
                    y: "Income",
                    label: ["Country", "Income"],
                    itemName: "Year",
                    tooltip: ["Income"],
                },
            });
        });
        option = {
            animationDuration: 10000,
            dataset: [
                {
                    id: "dataset_raw",
                    source: _rawData,
                },
                ...datasetWithFilters,
            ],
            title: {
                text: "Country income since 1950",
            },
            tooltip: {
                order: "valueDesc",
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                nameLocation: "middle",
            },
            yAxis: {
                name: "Income",
            },
            grid: {
                right: 140,
            },
            series: seriesList,
        };
        myChart.setOption(option);
    }

    option && myChart.setOption(option);
}

function chart4() {
    var chartDom = document.getElementById("main4");
    var myChart = echarts.init(chartDom, "dark");

    option = {
        legend: {},
        tooltip: {
            trigger: "axis",
            showContent: false,
        },
        dataset: {
            source: [
                ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
                ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                ["Cheese Cocoa", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                ["Walnut Brownie", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ],
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row",
                emphasis: { focus: "series" },
            },
            {
                type: "pie",
                id: "pie",
                radius: "30%",
                center: ["50%", "25%"],
                emphasis: {
                    focus: "self",
                },
                label: {
                    formatter: "{b}: {@2012} ({d}%)",
                },
                encode: {
                    itemName: "product",
                    value: "2012",
                    tooltip: "2012",
                },
            },
        ],
    };
    myChart.on("updateAxisPointer", function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: "pie",
                    label: {
                        formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension,
                    },
                },
            });
        }
    });
    myChart.setOption(option);

    option && myChart.setOption(option);
}

function chart5() {
    var chartDom = document.getElementById("main5");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    const piePatternSrc =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIAKAA8gMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAADBAUGAgABB//aAAgBAQAAAADbsmSfE+9nrWXDS1KIJVJdPcqylHkel4DWpy2foWHYWgmU3kKEEr61hNdXVpSGA2MNW4maXPcd/DxrbPJkHluNCRP1TJbdCA8ShlQH9XzJxEVhW7DB59uHTW4Tq+nVKqi3qchAlbiLHpTfG+VPV2YnqDEHvRGTpTZWqyoFIHVX7ZGDns3Jmo12c4F+etTVru8x/IlWzO3QekGN9mvttIN34ibkzyFuafX5482CWlN7+n0WbphYQfpQ2AHSoenmpGljFSpY9h6ZHpNV0ELYBQbGkWn83Q8TZF6NTvZ3lsIfqSbKO1z3mvSvbvK8NFPVhKRNhPkH6IYs9RxF+dqUhe98pGzt8mdNpPZafbmpbGdwq9JMOrJ0dCMkQzgr+QaRTts08cf5czdE78Grm1ktmnWfHmdOki2q09F7OhXmyKTmV0bko9ETOOPxpa6cCzG5sUo7yCzkvvwE7i4K8pqvmRrWJvWpqZg80LT0d6zPnM8MZLUVO5v2fboZpFaiv+goFnyF75psqr5n4jRiga0mVr8KWwZz5wdtaw/Icm3ocrXANWyr8eVdzGkBQuZ89mPFa7Chqn4gqKVFyjC7mmmOMnz55t9zOFq9Lx6/0dLhO9LAYlKDX5gjZdHAP3ZnvyOr0vJa0AtTAe7Vt5+p2EqtOAytHBel/FqJ1/kii7Ka/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQH/9oACAECEAAAAPUFSYdAW5OnWfn688ZEK457J0idiURQdJK26JJlaVEbFUHUrqjHIYVcISz05qLKxTVE8zzSdmQORaamdWWFXSsKF+ZwLCa0XS1nJ5qxujzByay2ULqzb//EABkBAQEBAQEBAAAAAAAAAAAAAAIDAQAEB//aAAgBAxAAAAD57re5u8fT51DPR5MnanJDrz3ztw47RLubnKDqdxig7nq8+mh448tIp8cwUG0madLa9hVOkUhmyb5gtSDl6Jk+k6payHlsiez0TtJDF2U2Ki9eTof/xAAwEAADAQACAgICAwABAgQHAAACAwQBBRIREwAUISIGFSMyJDEzNEFCFiVRUlNhYv/aAAgBAQABEgDk+ZTtRgB6aey93d5SGlqJcFG5gEfizukB93NtKLXiCcm8rJz1MrwNPoyibicTC+n6gjmEWAvmFFJxnG+aRQ3ah3FHxSMY439kO0B9a0MSjjUMpvo6rHy7V2xtav0G0lLEjM/tParH8ZFeLj9e9yrvVF9TWta1nszfh7zfHTqe4nCujr6/kwX3VLTSNhgBDm4i9bjVGmWhKltce/LGe+1zIw0xQoVgZVzTb6DceeUC8w8PWw7JZzJWmOYtdg8hvt7qV0/GAzJqw+3yOOPNEtBNLJZmvZxklpdEd1/OJviwiSPGzrd6h9i3UzY//d+57CLVpDkZmudqXWO7iP4k5BBnmqSYOYbPJ13KXOHrme4+3ncJHHP4n0KUz7Gf9RjZ5lW9PqUuTuqFh/PqpXMTmcjolQZfvlpBS9+G5s5iXp+cRy7mcm028a4kVyj0+CACIj/XTfjMz4zJkKan+v3GGfk282hGDJ2WSSYH7/OO5RaXycd2c0WH5zZleyo2SQaeYf8AtKuXV8W9zDUKqDH1hy3F+WqOqVuHrfX7a8vl45vQ0P4zqwzZMzjV51mjoto0OiDQSZFSpQthSK7YOctyn2Y3wA52Zj+7GS5HoLcqsAPS9hm6WJSXXsq3JwJa+7+iq4my2ECGE7NbNamOkf8A5gWDk7D8ugBMEcyaTKrsWvX9GxTEM+8nW9SSCuPquJ00qLlG3exmuqW1Voau31Fr2G75VytdXKO3oHtxQgDOIgvZ3DUCnQaubyvjIElSnbFA4xEPJvAGU8e1LnsYQ5rKk009uV/qwSmR7Hbswt0d1rFYPRm9G0yS/T8kj/U/ZuX8kAig19OjALTMKlBjsdC8xAST4xk65mjNnXdAjzIXoS9YNfSnVgS2fNsXjTesGu9VRBjO3PF+yeJd69/IfKeV92MCnqlumsF43j/cXRzlNVpke5nGRuoGPjPDRP8AGsFuwlVidYD8L06atkXxqftWUZ/7Pk9jttWER7QwKhAPlll6cZ2vyep5dGbLPModrn9v3W/+JNtNPIchMmlWRN9DMPS4sAfyHgAliX6em8rGCzBG4X+ZeNyDjWvFPiRPbRLp8ji3K0oTMo58GjTPEj9rvLxKxXP27nx7gxQC2A9/4s9n8idLrJAFIgJtLAyU87glnJqR0V/w45mE9iuPBRa/99y3hOVulqat4K6dtAJ9uQ8pq+Y8JU8TMOMB6NuOFkwCav8AzKW110cg2qluK30ggq1V7x3KrUZ6jf8AtgeLVdlGAf4CeLKGNW5q0IItf6+4Sc4yNT+PjVOnr59nrvxrxZSQawRZutkixym6h3rARez5xyOJWJH9VQ7vbdPkeTSK9A71pWAjufPa4P1G5HXPxnwI5MHWbyHtX3E2MpQDAmViMfGYDofMW2TEqmzUL0yzFj9Ob2vcejVol617v1MSszNqsEWaFSce/wCxP/kG0F5+a1q0L+6/K0e0dW1vKK4dOPWVrONBrGLNVlPIPQTFoG1ih0AbyQVDYjUzMVQKfOYolAr39VAtX+e+tHKwp+mtE8ixZu6iC9QcZiwzutTuk+Nqhx6UaDe/YHsKyzUTJ1IinTHzvJ8hSlG+zepLNbtS9cTfrCmnB8dsf840ONWfuFFDCPt+WShd9pOcY7MNXgMjl5SRy3/U1C3tEPNR8rVW6Fe+NYJY5fHSBh2mnZSJYD3RWTsUSzMCxrU549SkFSljEgU5kAaVwNYtbHNzdHytyWJYOjTyojudd8c1/TzbNsdxuLFF7MlRxboa2slUQ/8Av1KeGbL5WnBcYFmBk0LZJaaXt32foeLivSsEhOkhAcHCpxtqyBC2Jd+2rOnXIxJ7D0wAXjsmQfH1k9rhLwPfAK932XJZION6fKzvpqlDHKpdpMMWAq99yIKWkGIP85y0j+OYn6qPa6j8rHj3Wgx7pEOF4dffifuBygOcb0z6BBuUTcXLahFyGNtsL8ZyMXDrlbScmCtc6zzDaFOf9KsewCzwrYVUYjBNIO/XfZHxkHF8VVyX7/eULM+Md71py7fQn9d9eOt5TlcVUNOesRxeJZEj7OoxuFn+Pj3pQCdPaezO3+Wv4pyQQ8B+2wvGK9p5/WolQkl6ZBvzI3N1YmKNLDEw05bdx62UmhwevfZyTAmTIbI2toyoXeyanP7xIpWlDDnHD13FrRzWcdlTur5yxO5ScAumWBYvTLAy26uuYEgvw/Q96fn2n+0pmzKwjFgatPBUzUGZZmeG+cNPH/bU0/e8/JDi2jydXUf+kP8A7fLmsOooprSCzR9h5M9upjAzSPrIs1fFBUVSgpCjBaAu35VxqNSUuUvf6x/cx4/fMZ7ypD9cBP469ravq6mjZcaWhvOTcsEUwvUeIyciDeVQxJsqieRYwVr98/G5Yvtj3pZiPzimyr5CTGVCDfaQJ+VFbdgYsNJOkK9CpFmZGcs2glQs3AztCppuV7cagQ+FAaYrL25unqC3Ph1PrRxNLiWSmiL8+aIZy7EcYwCeX7m662jcCZdkuOwR12PhTTLLyJXljDD/AExnDcJCU2qeqcVtSe5xvNzLEHQVDvcv0+Qco7kHfYWzSzSIF6xZkqzXxk7yH4PlMV4jjpcOmbx6a+nzQjdS0SAlrxvLKA+YA8BHpxRZ82LkcBFIf5Ys+jFczLv1gb4InYTA6Ku86mZate0w9nytyXF7k8U1rT/Jm5xyu2SuOxsVKlnP8JvG9i6WKAfO+BCQdYytnGOBGtZ5sXys2oFNKXbqCLJvibwZSblmbamNFOfH+k8y6lNmSHOvNXVXS/6mZM8GN7YGwL+tdI9y25Jok7M5upS7uNBAUFGz2M2dVwcotgSuGeSlXcFJmPKwUSxwevjdoVMyrh0+mcRyhm4x9jGTv1ZT406BXgUyGgpirrHWMImbnIINe6vA8qMR9mPylEpsrqw1/r61QIc3+t+qxwVmJHpyyGdrlIcOZhFm0cxBkzQBsw9fV3zbVez+P8e56gnWEq93b5eKd63KBwunR/ozg7o5MSmDJFEw+/sZRYmUHIPfsATPONp90p0vR3JivPpure2KPjspih0zWWLm/QrfSsqGTqLw7+QV3LrmpkjJ25+GKbe7GcadT+ymT/8AU5SolifTkTzwZezeXXHJyGI8zkXQTWzhoJiimQ+AvbOP7s5BK7zUnj4+gr7OBn0pN/J8Rvb/ANfhtvoQfG0qXKib2Zpnx++xzmm3fJEEvzjpuKia3FkorNR4xvLWnyGCtNkuToAgPbpUBOAPvUM5yl6/nE8WZcpxg2ub9Sj/AMGXn4+H47k+OPjFefVQtfqcmaiq3+t9TQ1Hp1syFffAmVikei9M+Tbk1YEmlvqnEdP4ul5UzPyBi1aTqfhBU8E411A56BDyYBcfpQogiMBYzWtmVUPGw8q490ve75xwcWhUCGpuxFBlmMyp9XIG2WNO5hf57csqXdqXKdjFLHtPxkqOFMmTI+yucsE95PgIh7yhKzFglfq4ulrIyalKEr9vk2cdzpcnS5XF4WF2LAasqjXSaxkHOhGxzYWs4/jXZYlxsJZ6zjPr18naPI1geNjHNSbVdgRMCU7OfTvW2JkRrSRfdoUOepdMq4yd6HPrkMtqzkvrO0wo4o1jgka2xVxnRf8AUlen9FvWAV2wihIY3wA+PPqzfzvYd/8AtL79903G4xfhf/BVFJwcpZKx4PLDHNPat5B2xSxsxHcdcb28TKwZdUlxdRxmFuV8i6nkIw7HKWSrTIZ8pLvSUlYj2Ywwpmv1Kywn77DDeNTNjArpOj/UfJhFdx9NpxTNTqkAJ/OZ1FS0GxKiygvB/FQlhYTMxpegdYr6HFLfHignFWiXk6x4weP+tEhRdGlmsRxYV8efJan9FvYxzkO/tFwIK8pQUDMDBJcTypZYo2HlCzbRyTncpNrInfXAxwy5p/IOljCZMmCj1n7v48QtkR7KXTy6JOcr+Pp45q6X8ihrpV2r9aUn5Nn0Y5plrJnvc27MBU5PJ6zBmHrHv5QYplua4Q66xcsIBzTlq9MywQX4rXxLdvSw3CWtY7cnmqkvw31aWb2+cg7lfWVKsmxRmWfMsebZM5CNLmrJgO+T1Px7lEvX4BCkMKaFYucTezWqEMxXCA5S3OSZMYGGZchAUwKs2hrrd7L8Ox6XJTCnSpYY7TvGSqegqe69eo2buX5cgvsudMOqR0WAJfp5Y1PgHxsPM5XmaWZGC5t8LAVm6YGXzo3GCJHQQONDZtjP2d1KV7EIbDSCLuRxlLmizqGZyE0rOU4hUsBivVDgY1e1UWTJ5LAVrVrzNXGmkEo2wuimHp8pUgpUh0cI68d6pSir2FvYRw/Pwjji43iK8QZs32HuyM/sMTSg506gGD4eaL6zieeEWEk5dwGqkdxUuJ1wdQNvCyZN6P8Aacm41xr+cbyI8mjkoHuf9VdC9pVxzPs3OBD0Tr7uHflEkA+x+P8As+SHcB/Pp2JCdbGLlksw+IjmHkkNr3cUwfYeclKvkrRsYDegUCCwqqV9t0dbCeww7pVRyho4hyV8Q89B5IW2ZvJcj2yWSdJNUzAYibluHe+SuvBYvqe0QQF7KRu5c/Q8C/y2At/PYPnKbNlCjQ+vSR/z+Ub/AFpAQKo12iOb8kNx1vKr/wArgE4/nMVvppi8RFPJjemZEi6qqNZVFuMnqNeqgh1kcWyAJdy9h81tK8mBaCSSHj8XTJDldC5ujM+xoZG0Nula+rr3R+dmZtfPbTfmvlmUtebcuP1YEsYoeygj1tNnsozJjQp6pyx228h6CSe1G0qQXndV6fp3IaDfar1hnydiAjQtU2mswZjF417padf60YwXB4pXIynjbKs7Dql6zObDivdilsJDXqSw8OG3ZUfWloakGs3c4T8Mpu+rHO9pCbEwGbVV1O5Qk4sfOjcXG5x4tllKio3kAA++Wbh3RpBIFvr1jIlcltfqNxMYtTNWp/mJaRKzT1bxzc5OSnOclCawgJ86QM3L9xXcf/Y2ej6o918Je+WpB7bgisxXp3u+/cy2xas1QEC1cfyXUipcPfdL178+ny5fseL7b+d+Cm1ciAqZJ4Uf+Z8tyDm8ghzLEO9BD4N7kuevrF1UaHIzdmVSZ1P7rmX1zouY2clCnj+O0sZ7sZq5XO+m4xwM0/03kXWKBFftJHsq8eeUyFUQp2vBOk2YauKTtletbLp/THxibIGJxnJJjkF1D+/R9PN8gzEyoxHHH+PPNIpl5GKZjVYrCWHTnuMchM9ldhs3PWa1xxRZxdhyj5w3L1G8gtSeO47UwsoYalglMsM27V996lb18GD5uPVTxIg/xp1J3N5eJg8rq0XfrqhMzxPG7A36IC6tFRavOLpeyrkglmcpNPZneFfjkLC2s/OqXurKLdkZzJTdsULAXokDuF2mr3DKtBfXTSyZPLwZx/gSY1iy+Mr9sCwGXzptIzM9sXfx7cW7ziGTYd7VbY3UzEHvUw2OkyTa7yaSgTPOmlC4mD9BLlAgWYDAxWe01qds2ezBYfq6sP8AZ3KcuLd/JiqnhkcWBqBWWA0v9/5I6SfhK8498znseOae4nSmP3Ka2gfDvl32XIUgHYEizEw+E6l7FyzrVqDaSdopdyUCUQ3GBDhEvGcs72TJ1z5/GD5Xi/dbtlHFzaC89mbv3GyqCNQep5j69P8Akm6rjOOgkCkR38OZy9R/ajRpqCZfpXquYjq3meHW9+7pmX+n8gBMEVMrSSLQ+ua/gWBnEqRaB++jscy+Sgm4+T7jQcVjQFZ5xs6lcZbmZOY6r/PXo+zvDZppB05D4zlYKU8xn+6hWES3ZvGOqcZS+3czK+5/ELyDleQNsdLRjaxmDxOVc2931OP851+VxXrlZ7nwToDqvcTxNXJJarLKWjn/ADDYQSnju4Ixa2j7HPY2GE5mY7x2I1/GZLsPECgPGH+PWc32hjsrcWqXH4zL34zleHNsaNj2d0Pjjmo2d/mwQ3GsX0n5huAmlAFQVHVGh/b8v/8AWYf/AOeWdr1vMQe1W0Fm6SeQsordkKMmASSfyhYC1Juz3Coy6L5Jp3x5uCkfL/Zua5ii2RLXHQB+53xeTGtDikxqlvZ0bdkxSoeggE8Q4E7x7jxckeJdQ1jydq7hcfJcUH6A1DS3vyCqZOz6ORzVTh534MJ380sLDd/mKzDNGBP8nOaZx76yLv8AP55TJqAauTwTBXifmOV/XSHrT2pSB3fnLVKSvQp5H7GP6m75/HSTsTkDKE6NNmro5eWBc/FMN/t9aPPihFTeWM4YMJQK8nnDrvY56bnwRCp69xaUv/uuVR3ocl4l3z+Pp5BHKckk0G5Og4zCr7gMfIBRTh1I8+cLrFG/j/8A4iJQ6JZuwyxpgfG2nHtMvTpz6zleMcPjvk5u3vae1cAtkyiwll+WMe66VBWHd65J/IfOszV8exuYiVF6c88q6RVNsnC3InnNomtioiCean7LhXhEnuQeCLPrQZ+d/CeR5jkePNIArdaZaxz27Jxzw9O5mD6z+J/rrqWLpAFaBD0mahSpnoQBp0+3uBPEZxiabffpEaO613exARhVZg4ForXlW/WmBWVqoLt7A3+PcnyFCgcuZ71GZYZgh7Nv592IceGJ6xtUHIOfa7xprb3X84SqapDqrmBhmIrD5Qt32/vx5KGMvHEZ/LFf4zA2lpkAitzZEwRBMeB3HCLDZz6DpS180zZ1LQXn5xWzBxYbu4LmiW67kOSaqnj07ij9fsk6Icr74uutWlf1fGANPG/ZFqzzO7RM9qxH9xmKpOhJqLMPhR+zc5Jo3MM3Z5vVLENkKFO2gzL17/H1cdlTFNTrWH696KyMY7eNUnc33l4ZxfIUs/teNICVKFReW13QM41MeftPlXTFcXfGtFKHBS5qhHQ1riphLjWpPvvVgJ80sq3kLowd3nX0npzk70glM2KlX6zMJ+FlJCS2FvnVjvyVWeg/1dutItZsfDyXICn3i4QNm6fI5NNyJ6npiEf5yLrp1XJ8lCwj0mAJ5sh8bvhdNmklSHL3UogHj+gfWEl1DuNr0OVmp1s+D62ikAlvp+mmeXN1yi8M0VWsCmkqRFedvKf65pwOVU6bVmPnPnCyu2blMpxHTDdmL5XjDkkgcLiOjT8HvNyLxPpWlXRRr9gQypTy7gaB47DJgMsrXsQB0YpzRHdZxAHUEyHB53S/AcjxhpZZgImVL7RzWfx5MCkcnawO+TklYGqoFR2Nevylb1uXt/LWW84tKY0gLy8Lzg/7GZ/rCmZNPtYHd3DzNc8220t3B6Mz+NJDH0rVMOuNQrzWVn9psmmpRGAs0OPeILtAUjpG9Zr3juHorZiddVIM7176/qvXTatF9U6g9gfEe1v6VWSoX08AoaxCTEfQUocMT1rbjTx/haEq8gvPK1cl6w6JsMeueCjmTPvIbbYWYfY0qnapU7lIm5Brz7Hm4lw7T3fhPMCD2LYBg8MD2lgeUhBx2utgtYkG0Lalnn+Su4RcdcXmNenQkwbEviujHT8W5wK9fsP6N1Q2TcfJQJreIbpQGW+hWTNb/i7GWNoORoZhq8H5DIGgmZ0G7uuMBxecko5uK08WemY+O9o/2R2OFhCyMx3D4DaHJ73yq5H2xjuHyb1U6xaGniewhvyJh/cZMtjB+uQ5utyNyn9ZiHWD7NNPIb7Lc1X/AErRJhfJ+Usdx31o48aoA878N8noTcUYrrWXnvw7iVa4leSbg+vT5Db/AMuSjAL7ArAFKsUyE5XgDmitJ5i5l8xAsh0KM9yzNKip3lOOSe+3BWa9/q/rF+SnbVnu/fFura2mLhEbiwL8SIj9S+8y5mUCWnQEcp8dYvb2N0zLz89TmysflXdxyj5aLb+o/m7/ALZ8o39m0tjencR5zONYbx3dQWeRLHM5GwGdJQPMSBEafky/t6oteKJ1k7XtlShmJQs/sifbQ+ckhq9ENSBEhS2IxirFTrarp7aRFbD/AI9L9PkXwMJXRRDujMkM5fmdb5HOg6jVvmxM6rmrDV0CnAS0d5NIhCyhlD2az5yTTbw18Da/Ul/X8oWoeDr5Mx0zWpgBkL6hQxcs2ZX+uMazikrqWFh66o6h1zf4qhY8jyDt64OEW5vJ6kFWGlXYGiWb8hIc4Q+KSiemikfdnzi+POaU/tPwlZ1z1MyOWj3A7ce8fDtKmpc6atd2Dt4A+U5dKFje5yQcb0nvyW3VmxSfsdzeXc+YOnj+RipXTvt15bm8Hc7j+a5VVLtp00Fp5yL7b26tMQ6rDZvmVnLrJiFJjyrFM6Zxrbd8WcjZEspm+NUcpNtc4qUiKjEyolSpPHZgC3W/6LM9jb/+J2//ALGZjZgdS9wvMB3xyHrCqGNKiazt4PQ4xjStynT+woixBcYgGCcp0ngkRHp0eiEnJ+q0sM+mbRw+etdYrULcMt3NdNu0py/dSoC3F8dT0rvZXM7VGLnm/wBWNsjzkH+MYLAObjPc7+QPfMlQ5H1850bvLclQVbc3DXh/OZlxaaYzfp/8fK5un9IYJm3K1ezHJ461EuB7nbjsNYek7CbyYGiPZ0aZGZyJnaA0a5rBoEvPzmbUSwU8WAnrJv0P5wa+Phip+16nujJLPHG59YG1S8aTkqt8M16Sryzwc0bp+rNOSGKnh2WOfrUyF0NcSgW3PCE4L+q0h/G27svLOpkzcULvLP5DXbexOrwgeoPclWvXbz9j7kiMv1xDQZNBLxtgKW0aNH8LncDaUVL5Al+fX/rOhy+Vpuc/MeaizVs5aJjUMXFiTncPsc3kUuP2jSIlpEDs8J/9qKev/p8VJLi0JF793RIN1zcVEk2WPM8IgYxKTc5eoIzSfr8mZeus4c66KhXnS1ULqvuBcWaqr0h8VLxo8WRanGtwmHrYdSGn+m4LA8H8vOZ1sjZJeq9EmbtaZlNQeeX56iDc4mnj4eRp9frzWGOYAPcwvMSia/fxrYz2kSe1rda/9PKJY9mv+z40QaPyGQc5KpzI9S6YvL85Qlbc6VWb66QGb2zP+mGx+nzRX2X6eSzWEnafOr0hSZyU+omWugx+9BTq+Mvq/dKkCwug7hkl0hcgjXqxYT+dDj2ObNYFOq8z2pt8cY5wpcGgdT1PHQYq52W08aMm5CwypPa9ZttSGKbm6LN8r2X+xfY7cxWWT4WMRVZyzo2145kwk7XcX1K7o2JRKmMl5nJZB/Y0myJU/gvO4jlpnRbFGmfroiG/EtSlLvUOIzXie0fcYf74Z+N/Pz//xAA8EAABAgUCBAQFAgYBAwUBAAACARIAAxEiMiFCEzFRUkFhYnEEI4GRoXKCM7HB0eHwFFOy8SRDY5LC0v/aAAgBAQATPwCUrhDu4guLomMAVAMTq0Rc1pd3akJNCwm4iO5vXlEszAkEhaTSJt0TfiZpkdzduXvWJYmNrkG5xlbrc2OI2QZAKtKWeJF5FrCLwmPuEiDb4tbpCiZiptyltLEe4omIQgu0mjl5QrviKluJjWkQ9K0hWteYq7dcI/aAZJJBPJ30RPeJhCxRdiOXgtPOERwKRBd+6iojo4YteFRJxCvmkGgiCsFok51par4RQ5pOcjiuIYBOEJym2lUbiItV526VhTIAXiirGkTR5rE35u5znDaXPrEr4YdL/wBzWwa2zAa5wi4Rb4W1jhuNRyIdwly9oArsm3NIiuVUgHNSbuy7l26uhJghbuEWj1VboOaJEpATRKJIEZqPw+4Ra1pL0iYnCLihaQ2u6InWHlCygHbuHa3lXl1hRIiNn/TLH6FpCKIli5u325wc4yNR127S84lCOpuxFzre6lIlNmylutFto8tvOAQTICd2Fh+Yr82WO45bitb05VhXWM3TBrcWu3TxVIVTsfQrR3a1TpHxBtqLVaUsdxeHSPiJl3xDCR5F2yxp0g7WC0LvSOqJ1hHGE/kIiIttctE8oa8QICv4t3XH7wnwwgLW8S7u5JEuSKsIyvErstOkNFrMScW0daNiWpfMYK4i7Km2Aspy7vp9KxLmE5S0IrnWuqlsJLuMd2X0QSiasrtRw2/yhHNUQ2DaPjrCEI0ZcLm3Z9aQhPKz9P26RMMgudbbLLHWAkC5zlbu60gZTbW3EWtw184lCTsbnDc2GysfCElu4Q/uUmj5wk0QBuuDbRma9KRJMgDFzCuyGiXQc4mhtY51w1RF6xKIz/477XdPmL9oK0kIBdcBEQtGmMNFJCi+1wbPTpEsaioOTErR821SEQXTRMktt2x8MLSQmbe726wcwjYOVwuz56DC3cN9SxK0i9W2Da3FC3XCQ62+esS7mWNEiLb1b7KsLMF5vyJu7WqOgJ9RWxRHXcXO1I4ghKTnuG53msBLEiS5HCRu3c4VXEpNta3QeUGtxk5tzREm6ZJEr4WaZIIj/vOJaABGOt/zCIhcv1pSJ3xIlbNFBxbaJR/F4b91zboMSIT4XeIxLZKJPSIkt31iSUoXsqOQj0RXQc4iK8sSafXWOGJj6RluJvhT3hJYkTpRIRWuLwpD/BP3QhiU+WPaO4uWW2EMiFA1uaJNEvTHw0toz5QVISEyxPu0p1hVdce7FvOJiMNJZijcsh1VG9YSZcgh3CNpc4DIyfg7J3kUS5V8iYZN6W84awZo5CWTXQj3g0FcJD3VTb4wbGyw9TiyrVG/mAtM7c/3a2wCkFHgoucRO8VWFVwy32tdvIqfWEl3qIVcLrhbys21WElOsMkud26LikTJYnQj2iJFl4Qkpwr6fv8A3iZPMbjtGyWP+IoIkBSicIiRHuTKukB8USSjZc0eGjXFuTosS5RGSXLi5LS1SFmkIoIGjRIdw6dIl2UAyc95Jc1IBxCpBbjtdDCem4bpn86Rx2iu4SEbRhTfSW3aTsqLWEliZKQEhO/cu2GgAIM20htGFJKqg6VhUFp2uI5hFbd0r4pCoLUIxytxLRFbCOMgL/qj+qlCHbExRlDL9F2XK6EcBgytvaRWWjB2Ejx7hTy8KxMITH4gW3CR4lp9Y+InCkiUwkEQmbiHtOlR8YlqL/hDY5je2tXfjSFmuFgXOIRKElkYyzDd6nVxp9IRwULHIciqqYxKQjMyDINrea+Q9Ylk4phazCb+ncvXlSFQlJH0uL6p7lEpQEQEKlddiW6FRou1IicK/wDnWElkAo/9PnEx4ll2/VFupEyYJE5ys7m80dAyzI0Pdw3CLYRgiZaZOUhbr5wcz5SjKG5zvJYlKJiYiW3TMq9FhSvkC5XAW3wRvksFwnL6hyL8QkoRw3OIRv5JBzOXK7dEqa1gttLIf3DSJazSBrbiISK12qcov/8A4iaIIQSmYFba6it5dVjhvo8bStuKZz9q9YCYwELc5w+ziGEQGo/1F20X2TnCzHEpOUhuG4G1t0hJYma2XOFv56a6QaDNEO5vDy02pHxCEBs0cEzh2k5Kt7uUTJ1yiGX7vEYPhHSUAuE3lcLvprACQ15tyG3SjYA3MJzRL793hWHCImOROuJsuq7coMhQJgcJRa3tGlG/SDKgKJjaMxu3k3tpCymCggC2/Mu35a684kyyaDwtAnCPgnvE0xEVfk0BuiYoq8tSImEW7W4oNkqVL4RK31eUSZBziP0vJoiNInzWkH/1+vjFhHio9SIYO4VeLcXXS9aQqtIJjshCW5zfOJaCBIRlaZORxDRfFVXWEAiJ24bSy0ti2UUwQHEnC5tFy8khFBnC0uIcvt4pE1B2TXMIR8tXa6wrqinTlBoHFdo9wlkI0RsSgMP+RzaQl7LEtGkjOwSIfFLR20rE5RKpEKkJETt1bW6RLHggcsK3W2+COEsYWWZEZmGTvfWFAhMLkeIja5yLj5LrAtIlE9xOx8LFSDcVZZ0u23UBEGOGTkYKk63HXTnHCoSF3ZYwbxrg0Wiu2lsKrgQu6Z2818YRB4viLiHb/tINGi06iRTC2tRLaYw47yMVddu5rCoRljudurp4ws1pqRji1uWscQReTWiPy2+NFivFNedxDLG77pBzJXwgGOttCccKpFVg43C7rrtpHwwl8RPBgq0phcudLR1iZKIqE5Jl17RL7wEwTYwLritEtcYMyIW7RL9MPASmCeJu2t1+ixLmvpLxMC7eaYwk4wBbrrRL68oOWZ/Kclw7R5QkoaVhRfcFHDl/SDXhEgud8wRxHxEfLWG1NSAVtI5hWjorvtDhHil2iNrRGAY5bkFu75WnvpWJky9ZfuRf6kLNcYE1SsQic0VTFPFYmCHyiMbmu86W+HWFmk5RArmiP+jXSElkYt2k4u6JpjKJoCjSaJeSeFOkAFssWpl9EVC5ecTvmkZHRznEIuGiK2kGYsmDKFBHHERqil+IQSXik20R9PO6PiSIJqCBKP7edBGJT5Qo8XCI4uHRHcoNC+awHCQ9paeES5XFJGC4stusTkFqy8RGpKLW66l5pCKJA0KXSyER/KrFpz1YW5zrtUiZLM2THLkRE1o9BSsSkJAmGFpNAcusTpgka3KJEQy91aQEoiJSarnOFt0HJuWXN/8ACWwaiBIB1liJNddyxWHCVSMOGQi7zWDMSqM0kFg9nqHmPhHF5eXOAlEInMehEJNyEeZLBqTgIxR1pe/sMTVYCidRErttVW3dziVJFh82tJrSbS5INAGUHCrcQtdbWscMy4g7iHFojonqrBo4maYkTmjotxZeEThIhDc6W20oOWwf0jj/AFSEO6a8HNG3yXGAT02EPp/pE1xC0Btdt8V6xLluIxx2t8YOaw0ZaMgQ2j/VYlIIEYtSY0v/ABEyU+omLXW7dNv8omIMoLwS4r7v80g5pjV4KJAzJutbolIMoFZUREi3FytHKER0hR0K8iaJfVaRMKxR2sGg3e0TFGVw5oE4XCSERuVP5awE0tNxOMnCLvJIlGQjstI9wiyJZCJOMgIWju8boUxIZY6k0vVCy7jYSYj70X8pAzNki0hFSc7XpoMAooMuUdwh6pkXgIFNC1u21deXKOLI1Ikqq5QZsEyc1penu59YtvY94W7RrX8RNGxxk1zdpUokI5qy3LtrmNUSF4rFFyXEO5y5f2hZjq2rbtIueUJLcSFoNp/9vh4QlwP3CTrnapqOUXFUWI0bdun5WEIpNRAkxudcq3LEqdxSQQFHA4rhzq6JaiJGUomucWRc3RxxMjIKE5jrhKJcqaYmTbbihFESAmq1w5N/MTZo6PF1rnO5wkwjFBaksSuLKp47VhUYR25CW0oMSMkICuIXbqVaVETyiUgjU5VziLaNKeMTZnFJLQFhFiRadFiVJIAcWIOJHNprrEs+KQC5pERWhEpRGgmaDdb5opCNOaVhUumFiQ/iEC2Zzu9PP2iYoiDJspoXXEI9xc4mIRkBOubtu9oCVxheFe4riFFuiZLF3yqEAj/fnHGOJjjKZ3NIhyFIVojLluUiu+kS5glw33DxBxdSATbreTmuKqXFBFwglNqTJbcuaZRKVxzZhlldlFB0eQlaOwqJ9omS33dzvV1GDNohMC54jkXt0hEI6i7ERluEtNPzBkIkggXuRNHzhEKdTim4ju3a06awksRM5jmkP7edtPGkfEzCajR2i7+UKjhN49zRb7VhFvWXoNv1pHw7WOc30/uj4e6swHuBo2t5OiZMGVKMgFxNB2RJo0liZLEhkTANRxddySJUpryxuJu76xNMhBScpFta2iVJ3SJkoTNSdk2X73DRInIIEoNcDhytVIA+RBc0WuL9S0j4a2kp6kTbcaQjFF4WiItETHSkKgsWZqJeRDqixxeCKbXt7Ylq4TmNaAeka1/rA/DA2vl5RMmMFSd/+dYBxs9RC1rawqiJz5jncUjJpNLVtetYl/wkJ23u/rSJs1pLLbiI+ywkwzFRDaJYuhREqNJMjIrh7orao7haOJa+UKAkRhK7SIulYmTSIkELREWjbzpHFIhUjJBNrl/lp0iTKtXk3ux1X3jnw/S+1/vSJYurLbcRKV3VG8ypWCmOJCsFxN+9awpuIH02kVvLzdE20FIAWYLbelbeUIBSqSzqJNLIXa2wbviBZuInFjzSFaJIL1LEe6qqOsSZRPxO51xNLypBuOgPW5xWuJaRJEXKRlc4hS708oMqkgzakIu7a6+8XNaYKN31RYmA4luQj/V09UTEMKlk0RLItMuUTWHSbqLRFt0BLeMyaBCV3boqL9VjkTpROEmkOPnASrUJeaJryhZZkSiE3a4YVR4sznYICNo+HtVYoJignaQSfV3NhAERNhJdltpT/EKpDNUj+uNK+cG1qy2Ox7o4wnN4gYD/ADTrAFwazGpiRC7wW6NplNHa0uiQkoXtC4huyLwtgwaMiW5SBvcUZsEhG21ou8ChJbqiZoLricOtYQi2EhGLRS0tfLRUioyhc1LZYuLHnbBS3mjxW4fro6lqVhSIase24vZUhEMyAXKIi0rS1TdFZQGYhiVaeaL0hFfWXNpMISuaOu6DmkFBAlu/P3hHGKkJK1t13ikfDyhAAt3E4WiXTnH8WbZQWuK0YRGi8MRJu4qonvFRec06EWWIlVVdD7TEKi0t3R0L/wC5NC4C/VovjCTiEQFuRNipkSMLh3Fj5tSOFy8sYQGhedrXYjXLrSJhkYoR0dwxEci61iVaDwuuIdvdr4aRdNOaQC24bWgOiD4Qp/wxduKXlqqZLdWiRNIkL4gcTAXOa6i2wjBBQMUa13atEKAHkTcX+1YNRCar6Yi3p1i2aUuXraPq/nExGmgAKC523mvkMTPiSMmmOQt80+sN5kBJcJf5gJjWEeF7Wt8q06x8MPFILtx4sLVNF5pE6aPFbtERHIS5trAFNAlHK4chKi2xMMJXCDR1ouurE6WU4m7Wni3krYkymiZAKNcJNHxRYX4kQGw8Sbl/eFmEXDF3qXOtYlMbMA65XNt1aUTZpGK8rRD+0SnNOaAjb8wYRG14QLjbc3TL3igsTmIiJSxu5pE4DGaoOaRdotVfeEQVBpihWlM96lEwG1uAnD2jp9arHG/zCTSZLZQitJ35iZ8S0VIqDaNt3n+YlDtDG/8A7iHGqRLmmPHHG79KLjEtxChcVBeRbi1+kTFHIxaTRG7kvt4QEoiHuFrcS1SFltGUyjWkTS8Ei0rQyaJCVun9o4IgIEA//GQ3aQYko2GpE51o+DolIIGsvXEhudSHCRoZknyhG4uSJ4+8BKEHzAqJERTCcTdLuixJue8siIvvQYVakFzWj26e0SpgscdrrsfcolnXivJwuaWWleUTBIyQb/p4fWEltqTVcRYjaiY0iaVsq/Lu8MeUAICS8t3qqsKfIQFXOISa0YlBcoucIuF0TCECAABMRbd1iU5xvEhDG61ftAynArCuG7MRplziUo2DtKYbi6WjCHQZYgLbQblROcAThvFSd+YoPT3hTaAEZNLG7/dIY8W6uJxZQikT5QHeRD26LCyCYgmKuaRWjpoXjHxJE2Z2iI7eXKKCRgGlw3FcKwa2zBa67cOqQiNBpkrSIi9tqcqxKQf/AFNqFuyEVrdTksGrSQjFo2iPSDcYWDbZjEsbQHQmCPdycW2JLXTM3XzLm6JrDmnNHUhLtJsfwhUQyIgxEqVxWDXvuhRaSsoQutaQ6V69YlynDwiFxEKttL3iYrC8Wjc4ibXwiatkr1EIo4ne6QgUJL0ucWXODIyrdtH3hAaMuXqTrt0IBCSi1pNL6QaiJTCMW3F3RJnjeJ7rkLxVbomSgejDUf4pNK7S0a81iXMKScwXKIkJdxcnR8PMebm3CTSc3xdyhXAUsRHuyIaawwbk65wj1MCdYIiJFbRE5wc4pVv7u5aRQdDc1svuEUx18awriKYfcTshGi3boACGUgtymXYlCq4zJyPFw3Dy94lSSCvN+TeqRMnCQIDnEBDd7lSGCA4ZD2jz+iLEtRPEHEBYt194VeV1133ugJhaC3JvtthWiJ8nuHcP+pH8I09Tu37LH8IlI6Werw0iUov7Wy9xaKnnpHxOXjaREWVNekKptx9v9rzhFARQQpcLmkQ+RQkwVu0xLtJekJLIhyQhu+nX6RUQJR9riLwthUcSCZo3tKFQjIyDJvdpTKAS6X6omSy1ZUnF6qViUjAWY5xEQ7hH+tIURnGjCxbUfFKdImtlSkeK4ju5/TrE1bDFzRD1eOMAFv005QDULhffqu2AlFNJpbhIt0KouxQSbblEqWRSnATW44+8TJ7aC1xG0fbckJLb80CtNtvmrfLlCEQEBd0sv6wq73KVx5XIsLqLpVSER/TEtCIkfdaOTqrCIICFq2i7bWkSphKUu9ptdhEtRlEzFrNwwZE3K136ekKLRAWoWGI8kSABopzIhIvtAXUIza1359MKjiliNxERbfpEqa29uJEV38vaFmvFGbi7R1T3hJRMPtC60ecKIuUm5NEsfzCfDGQr824nFthZTKvDIu11IlyyM0fUh/T9YmTBEgHutGFUhqXCc1zctYmy3UJ1xNFvVcveDF/EJrrQcVsTUcYMNCEZY7S/rH/Ip+HRURYQEm4ch8YqQ2tdbda7T9NYRqkonb8ssW+e6sIRMdpa3E+S+Qweot7f1UXn1jimNxg0RHwERp5wkvi2hi0cnVSEFi45CBXEUScm6NLqXLJdIXHK0rdwqi+NtVhBawAO4ZaZc1VP5woPJBbdbuLWJlopKCrXF6kRV/EGQ/MEBy9RU16xNtID/humXWiVKQHhzFze0dUiYpGKS5o59oiSrBSucs7WiQ+VV52waikpk3ELkIh99sSQfUT2iRWi7lyhZ5ILjLFjbi1xgJfJ5Lll41WFLkQFi0sS0r4xaRKEokK67oGUKd3/ACTBSAWiruqRLUsWoTB7hHdWJjRNwDi0nOHTGDUCJSM3EMvtLzGJU501eYtdW3X3iUREZi5cjydrjpDR5QswjICMXbbRd7wBCIvArWt20+9dYYQHNE8he7alXRNmsALlbjcRap0SEmkIYoRCIj7dbqQRWgQEpOEfZIRxGBAKfubADarButuLksTZYyiSVuJ253nAA2ohg5uQ8/eJmLTLu3aboVXElyC63HVKNpyiXLuboLSuu1rCTXEcp2Qt8qK3pWJdwgWhARerkkKtrztIfv8AikKtsyaFRubtHRolCcIBkbXNgDIRfKFwk3EuX1hZjhmFoWXaSHWF8SEkaTXOtrSJcsmte5o2kI6pBzbmyiVwiIuLZuhVDQAFtv8AmHueQVHKJswhFultu7yGEmEVXlxMiG7RUhZYnw5bXE5vdBywOepGVpiGXndSPiZYlNQWtK0fLw5a9YZIH8eEf//EACARAQEAAwEBAQEBAAMAAAAAAAECAxESACETIjEQMjP/2gAIAQIBAQgAnFjvk8wwUVH9ZP64alWimgGyEG47N+khNe6KrVH8z1ZEN1Uajn4DPPDFz7XXU+17+D5H3/HHA97qXUzL2ITdJMz5p26MS5Jv1RJK+jczU0wQOSt7PV3o9FLJfqqSuq6x+m0BOpKS/wBPmp77iJ98tdRsNUqgehJ69enlpnUrBVSpVSZIPTX8R3i1w8ubJet9z4qb3+h9yahqHHT7ccYkTdgTj/N+IhE+21VhV/zha3VYkYws7K2RF6ECBhewUrvr/iOaNlctEkxVPOPNbEk+nETkH237tKmJfEGrTIEuJ9cuT9eZxk0lsoPo3zyByO1kGjo9jV1Jo2XTWnfvhOOG+GmfY4Bmar86xxXsPOqr2+rx+jI3OTyE36a/9JmN/V5OEqdBUe3Xok3GSrN1i1MkvuuMexmesVelDgnENYcdUFGFqh65Qom8oVszammhr0nTr0wztoSjqvxj1uM+svfLNVUVuui8bKs73W4nNQTfWEPCuHVXUOIoiWqrXQZVcquSgmZKun59oOhNfnfr/wCrSiyVfy80LWZmclk2tG2WrhNdxcDkmcVaizhUIbsm5pyTRzTXKFzbPv8ASpOtfT9J9L1Xras583wQlGlj07MeRkmpSvTcUZd/WDmYTFzP3ul4o/bwc5W2p2yeDiqkMet+/v3/xAAqEQEAAgIBBAICAQMFAAAAAAABABECITESQVFhIpFxgQMTMqFScpKxwf/aAAgBAgEJPwATwzjzoufycZMyUMu1dvzxML3tXtMDbv4sODQXqZaNbsWp0mVKNsenX9t6nU2d/wDy4eku9webu4tWdiYa6QGJ/wAo9MXI+2bHzxMd740MK1sO24/nKZDZ5Z70MviqqZnooKiW14WVfJX1NvsWY5BxVJDJbrcyxgV4bm2oY0DvxHFW99tTJExpMRme/wA3UzemyvfqYl009idRf5YZ5f7uLldocmUyG8TnW4CeDtOZ/E/TOzqm5imIV1NzWIPnf4hl/bpy7b7+5k3XhmQE5LWzgnFO0j8rOCYZdPbqYA2PupaCrp5uY+vcGtx3yDcyYnTXFVuPFlX3iVVc8TlaemORWN3z2uZOzgjkfK1dwf6ezYc3MSzs8VFMbxuvEv6th0lZaqPbY7mGNFl3UaPV7n/cpAb3CtVM61wa3vxMb6lNX5jWTjQ2auZW06crqW/I2HuDz326mSANQ+9TJLSg124mO7b7kAd81CxN6Jjo+JOn6YpWXUmWX+I68vaAnNd5hu3TKveSc2znH+PLJovmDblf7JkvyGZUVlpJVdIxx6aEjoSqO009dMeNa7QTqqhmJ9QDEyugl1RkDLd/6e0wHLq3fb6mRfB0tUVxHloO3FxdX+4UYs/GvcGscU5GNYgaNy3Q/U+NOL+65j4ZgeAn8/8AllvF7KmmZJ08HHePUnAt8QujF17LmvkL+5xjkA8VqChjZMVtxKWq7w73q9zHHevMaXHL9xOlxMrlAVVO9xVchnTHha1XMy3V8cRytadMHY71qtwcrwQK1E+IFHqXzcHHUXbaj3iDqt3q5mO/q4bSz0VM3HEB9ahzj67TBElT/8QAHxEBAQADAQEBAAMBAAAAAAAAAQIAERIDISITMTJB/9oACAEDAQEIAK9bndYUWiP4j52TWiWSVZhs+RTDlN7zlJ3K7rU9URM11XWlSitlRX9laZTbh07a+f8ALrXGTYq0MUbZkaUJNG31OEybpTL+0VJfSQaBclhXKk64yRTU6vKgV3zTIzw7arli6o2zrdaVZn5ty/1zqdnRM075vU0CFcU5RqrI9NlAnl5xvXDjNRrj+p3YWWGasqzCtQq+nZmz9OaCYamP16kgT6Gq9OtaCvSzEd2lzudm545csodM9B01cz9vxjpaH0XzzR8wSroxr/A+a1/IZFHmeW303IyUKadbWn7/AETTsfuXo3WbeWJIdazSt1Md89Zdruie4upfUoYnCeZvKgl8wFZyjXFVYZs6/P3orNGVVHXnEV+b3Vb+mu71RVc+s59emvVD19JlYfUkRnoWeo83I0+W6klkynU/Ksr4O5dT/NWSejrVhBXczNmp44soCn5J3XiLUM+m8dHr1PnPp/Jy3RMSPO/IDzA85culJg+/BeUd78sjXXIOq1H+fG9HiUxDUaM7Jit75ubo87fSRuK6AaoiO4qTzZSp4EeKgcDTLnO84rL/ADORzP6wgurll/zeU79PMpqaGcfOpfJPhdd1cvr1RzxOdj/Di785g6J25suSsfT+tbM//8QAKhEAAgICAQMDBAIDAQAAAAAAAREAIQIxQRJRYSKBkQMycaGSwUKisvD/2gAIAQMBCT8AOJe4LaVlT6QDExAJHL/rczVOhMqA7iHmyTMbN8VGmiEJi72rgAX/ALiBcgpTIaiauzMxvUwP8YsveLEyiO0NDvZHmXyCYPaAgA9hBtWcZ0hcgzEjuWS4MkG9r9wkhK/mUPBAmQJHkGECnBlCX3pSgzVQkM924MgAqNbmIROyQRMKXaYglfEypj3cTHtOnHyI5dg/ExIs6uoS59sz/Yna2JliT2CheVdqhGwwOa4mI33BmJJlcb5hZqgZ9pHKmWPUv8Q4Sdjw4USlfiZbtcQi13g8EiYRt7brsoPdcRtvW5Q2HqDEspamOO1cANfiEdaB2ZmUeQbcDKKfeAQ9RYcGjRFOZ5NArcvLyqn/ADGCSFUPILMwZf5r3mS6VtQDINog8TEgMWMVF9rRPidvwLExBZEP9wA0W/HMy7V4Ma9OnDY8mZN2YMv5CI0ACMTBe0HcJB/UzKqxCVWINTRzAFrUIQCgxx9Jo7uYhk46Mb6qmOTsGDwWZbxYlPZMOtkTLKZE5EbJiYyTEQWOurmfUy6emlzBWz1WzBq/MAsgfibyxh8+rxCCyEEZs5FuK2Nd5ZIImNpPvMj3Jn0v9YV7Fy5iPVs7gT5AW4UyR8S6IHtN5A5EC24QCcpliCAS1Da54mR73UDAI9rj6mQpy2xEgF8QQfk9T1Maa3udKx1YhFEVcIxWTJcfqdnzF2hGVn5MVAgVxAxfCuYKr8qGgUfJmIyyOR/cKWXmZAgx/An/2Q==";

    const piePatternImg = new Image();
    piePatternImg.src = piePatternSrc;

    option = {
        title: {
            text: "Referrals",
            textStyle: {
                color: "#235894",
            },
        },
        tooltip: {},
        series: [
            {
                name: "pie",
                type: "pie",
                selectedMode: "single",
                selectedOffset: 30,
                clockwise: true,
                label: {
                    fontSize: 18,
                    color: "#235894",
                },
                labelLine: {
                    lineStyle: {
                        color: "#235894",
                    },
                },
                data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                    { value: 484, name: "Union Ads" },
                    { value: 300, name: "Video Ads" },
                ],
                itemStyle: {
                    opacity: 0.7,
                    color: {
                        image: piePatternImg,
                        repeat: "repeat",
                    },
                    borderWidth: 3,
                    borderColor: "#235894",
                },
            },
        ],
    };

    option && myChart.setOption(option);
}

function chart6() {
    var chartDom = document.getElementById("main6");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    const treeDataURI =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC";
    const beginYear = 2016;
    const endYear = 2050;
    const lineCount = 10;
    // Basic option:
    option = {
        color: ["#e54035"],
        xAxis: {
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            name: beginYear + "",
            nameLocation: "middle",
            nameGap: 40,
            nameTextStyle: {
                color: "green",
                fontSize: 30,
                fontFamily: "Arial",
            },
            min: -2800,
            max: 2800,
        },
        yAxis: {
            data: makeCategoryData(),
            show: false,
        },
        grid: {
            top: "center",
            height: 280,
        },
        series: [
            {
                name: "all",
                type: "pictorialBar",
                symbol: "image://" + treeDataURI,
                symbolSize: [30, 55],
                symbolRepeat: true,
                data: makeSeriesData(beginYear),
                animationEasing: "elasticOut",
            },
            {
                name: "all",
                type: "pictorialBar",
                symbol: "image://" + treeDataURI,
                symbolSize: [30, 55],
                symbolRepeat: true,
                data: makeSeriesData(beginYear, true),
                animationEasing: "elasticOut",
            },
        ],
    };
    // Make fake data.
    function makeCategoryData() {
        var categoryData = [];
        for (var i = 0; i < lineCount; i++) {
            categoryData.push(i + "a");
        }
        return categoryData;
    }
    function makeSeriesData(year, negative) {
        // make a fake value just for demo.
        const r = (year - beginYear + 1) * 10;
        const seriesData = [];
        for (let i = 0; i < lineCount; i++) {
            let sign = negative
                ? -1 * (i % 3 ? 0.9 : 1)
                : 1 * ((i + 1) % 3 ? 0.9 : 1);
            seriesData.push({
                value:
                    sign *
                    (year <= beginYear + 1
                        ? Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5
                            ? 5
                            : 0
                        : (lineCount - Math.abs(i - lineCount / 2 + 0.5)) * r),
                symbolOffset: i % 2 ? ["50%", 0] : undefined,
            });
        }
        return seriesData;
    }
    // Set dynamic data.
    var currentYear = beginYear;
    setInterval(function () {
        currentYear++;
        if (currentYear > endYear) {
            currentYear = beginYear;
        }
        myChart.setOption({
            xAxis: {
                name: currentYear,
            },
            series: [
                {
                    data: makeSeriesData(currentYear),
                },
                {
                    data: makeSeriesData(currentYear, true),
                },
            ],
        });
    }, 800);

    option && myChart.setOption(option);
}

function chart7() {
    var chartDom = document.getElementById("main7");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    const pathSymbols = {
        reindeer:
            "path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z",
        plane: "path://M1.112,32.559l2.998,1.205l-2.882,2.268l-2.215-0.012L1.112,32.559z M37.803,23.96 c0.158-0.838,0.5-1.509,0.961-1.904c-0.096-0.037-0.205-0.071-0.344-0.071c-0.777-0.005-2.068-0.009-3.047-0.009 c-0.633,0-1.217,0.066-1.754,0.18l2.199,1.804H37.803z M39.738,23.036c-0.111,0-0.377,0.325-0.537,0.924h1.076 C40.115,23.361,39.854,23.036,39.738,23.036z M39.934,39.867c-0.166,0-0.674,0.705-0.674,1.986s0.506,1.986,0.674,1.986 s0.672-0.705,0.672-1.986S40.102,39.867,39.934,39.867z M38.963,38.889c-0.098-0.038-0.209-0.07-0.348-0.073 c-0.082,0-0.174,0-0.268-0.001l-7.127,4.671c0.879,0.821,2.42,1.417,4.348,1.417c0.979,0,2.27-0.006,3.047-0.01 c0.139,0,0.25-0.034,0.348-0.072c-0.646-0.555-1.07-1.643-1.07-2.967C37.891,40.529,38.316,39.441,38.963,38.889z M32.713,23.96 l-12.37-10.116l-4.693-0.004c0,0,4,8.222,4.827,10.121H32.713z M59.311,32.374c-0.248,2.104-5.305,3.172-8.018,3.172H39.629 l-25.325,16.61L9.607,52.16c0,0,6.687-8.479,7.95-10.207c1.17-1.6,3.019-3.699,3.027-6.407h-2.138 c-5.839,0-13.816-3.789-18.472-5.583c-2.818-1.085-2.396-4.04-0.031-4.04h0.039l-3.299-11.371h3.617c0,0,4.352,5.696,5.846,7.5 c2,2.416,4.503,3.678,8.228,3.87h30.727c2.17,0,4.311,0.417,6.252,1.046c3.49,1.175,5.863,2.7,7.199,4.027 C59.145,31.584,59.352,32.025,59.311,32.374z M22.069,30.408c0-0.815-0.661-1.475-1.469-1.475c-0.812,0-1.471,0.66-1.471,1.475 s0.658,1.475,1.471,1.475C21.408,31.883,22.069,31.224,22.069,30.408z M27.06,30.408c0-0.815-0.656-1.478-1.466-1.478 c-0.812,0-1.471,0.662-1.471,1.478s0.658,1.477,1.471,1.477C26.404,31.885,27.06,31.224,27.06,30.408z M32.055,30.408 c0-0.815-0.66-1.475-1.469-1.475c-0.808,0-1.466,0.66-1.466,1.475s0.658,1.475,1.466,1.475 C31.398,31.883,32.055,31.224,32.055,30.408z M37.049,30.408c0-0.815-0.658-1.478-1.467-1.478c-0.812,0-1.469,0.662-1.469,1.478 s0.656,1.477,1.469,1.477C36.389,31.885,37.049,31.224,37.049,30.408z M42.039,30.408c0-0.815-0.656-1.478-1.465-1.478 c-0.811,0-1.469,0.662-1.469,1.478s0.658,1.477,1.469,1.477C41.383,31.885,42.039,31.224,42.039,30.408z M55.479,30.565 c-0.701-0.436-1.568-0.896-2.627-1.347c-0.613,0.289-1.551,0.476-2.73,0.476c-1.527,0-1.639,2.263,0.164,2.316 C52.389,32.074,54.627,31.373,55.479,30.565z",
        train: "path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z",
        ship: "path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z",
        car: "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-14.185-0.216 c-4.088,0-12.789,0.113-14.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,16.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
    };
    const labelSetting = {
        show: true,
        position: "right",
        offset: [10, 0],
        fontSize: 16,
    };
    option = {
        title: {
            text: "Vehicles in X City",
        },
        legend: {
            data: ["2015", "2016"],
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        grid: {
            containLabel: true,
            left: 20,
        },
        yAxis: {
            data: ["reindeer", "ship", "plane", "train", "car"],
            inverse: true,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                margin: 30,
                fontSize: 14,
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30,
                },
            },
        },
        xAxis: {
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
        },
        series: [
            {
                name: "2015",
                type: "pictorialBar",
                label: labelSetting,
                symbolRepeat: true,
                symbolSize: ["80%", "60%"],
                barCategoryGap: "40%",
                data: [
                    {
                        value: 157,
                        symbol: pathSymbols.reindeer,
                    },
                    {
                        value: 21,
                        symbol: pathSymbols.ship,
                    },
                    {
                        value: 66,
                        symbol: pathSymbols.plane,
                    },
                    {
                        value: 78,
                        symbol: pathSymbols.train,
                    },
                    {
                        value: 123,
                        symbol: pathSymbols.car,
                    },
                ],
            },
            {
                name: "2016",
                type: "pictorialBar",
                barGap: "10%",
                label: labelSetting,
                symbolRepeat: true,
                symbolSize: ["80%", "60%"],
                data: [
                    {
                        value: 184,
                        symbol: pathSymbols.reindeer,
                    },
                    {
                        value: 29,
                        symbol: pathSymbols.ship,
                    },
                    {
                        value: 73,
                        symbol: pathSymbols.plane,
                    },
                    {
                        value: 91,
                        symbol: pathSymbols.train,
                    },
                    {
                        value: 95,
                        symbol: pathSymbols.car,
                    },
                ],
            },
        ],
    };

    option && myChart.setOption(option);
}

function chart8(data) {
    var chartDom = document.getElementById("main8");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    data = data
        .filter(function (dataItem) {
            return dataItem[2] > 0;
        })
        .map(function (dataItem) {
            return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });

    option = {
        backgroundColor: "#000",
        globe: {
            baseTexture: "world.jpg",
            // heightTexture: "world.topo.bathy.200401.jpg",
            displacementScale: 0.04,
            shading: "realistic",
            environment: "starfield.jpg",
            realisticMaterial: {
                roughness: 0.9,
            },
            postEffect: {
                enable: true,
            },
            light: {
                main: {
                    intensity: 0,
                    shadow: false,
                },
                ambientCubemap: {
                    texture: "pisa.hdr",
                    diffuseIntensity: 0.2,
                },
            },
        },
    };

    option && myChart.setOption(option);
}

function chart9(data) {
    var chartDom = document.getElementById("main9");
    var myChart = echarts.init(chartDom);
    var option;

    data = data
        .filter(function (dataItem) {
            return dataItem[2] > 0;
        })
        .map(function (dataItem) {
            return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });

    myChart.setOption({
        backgroundColor: "#cdcfd5",

        geo3D: {
            map: "world",
            shading: "lambert",
            environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "#00aaff",
                },
                {
                    offset: 0.6,
                    color: "#998866",
                },
                {
                    offset: 1,
                    color: "#998866",
                },
            ]),
            light: {
                main: {
                    intensity: 5,
                    shadow: true,
                    shadowQuality: "high",
                    alpha: 0,
                },
                ambient: {
                    intensity: 0,
                },
                ambientCubemap: {
                    texture: "canyon.hdr",
                    exposure: 1,
                    diffuseIntensity: 0.5,
                },
            },
            viewControl: {
                distance: 50,
                panMouseButton: "left",
                rotateMouseButton: "right",
            },
            groundPlane: {
                show: false,
                color: "#999",
            },
            postEffect: {
                enable: true,
                screenSpaceAmbientOcclusion: {
                    enable: true,
                    radius: 3,
                    intensity: 2,
                },
            },
            groundPlane: {
                show: true,
            },
            light: {
                main: {
                    intensity: 1,
                    shadow: true,
                    shadowQuality: "high",
                    alpha: 30,
                },
                ambient: {
                    intensity: 0,
                },
                ambientCubemap: {
                    texture: "asset/canyon.hdr",
                    exposure: 2,
                    diffuseIntensity: 0.3,
                },
            },

            viewControl: {
                distance: 50,
            },
            temporalSuperSampling: {
                enable: false,
            },
            itemStyle: {},
            regionHeight: 2,
        },
        visualMap: {
            max: 20,
            calculable: true,
            realtime: false,
            inRange: {
                color: [
                    "#313695",
                    "#4575b4",
                    "#74add1",
                    "#abd9e9",
                    "#e0f3f8",
                    "#ffffbf",
                    "#fee090",
                    "#fdae61",
                    "#f46d43",
                    "#d73027",
                    "#a50026",
                ],
            },
            outOfRange: {
                colorAlpha: 0,
            },
        },
        series: [
            {
                type: "bar3D",
                coordinateSystem: "geo3D",
                shading: "lambert",
                data: data,
                barSize: 0.1,
                minHeight: 0.2,
                silent: true,
                itemStyle: {
                    color: "orange",
                    // opacity: 0.8
                },
            },
        ],
        tooltip: {},
    });
}

function deck1() {
    const { DeckGL, HexagonLayer } = deck;

    const deckgl = new DeckGL({
        id: "map",
        mapStyle:
            "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        initialViewState: {
            longitude: -1.4157,
            latitude: 52.2324,
            zoom: 6,
            minZoom: 5,
            maxZoom: 15,
            pitch: 40.5,
        },
        controller: true,
        container: "main10",
    });

    const data = d3.csv(
        "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"
    );

    const OPTIONS = ["radius", "coverage", "upperPercentile"];

    const COLOR_RANGE = [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78],
    ];

    OPTIONS.forEach((key) => {
        document.getElementById(key).oninput = renderLayer;
    });

    renderLayer();

    function renderLayer() {
        const options = {};
        OPTIONS.forEach((key) => {
            const value = +document.getElementById(key).value;
            document.getElementById(key + "-value").innerHTML = value;
            options[key] = value;
        });

        const hexagonLayer = new HexagonLayer({
            id: "heatmap",
            colorRange: COLOR_RANGE,
            data,
            elevationRange: [0, 1000],
            elevationScale: 250,
            extruded: true,
            getPosition: (d) => [Number(d.lng), Number(d.lat)],
            opacity: 1,
            ...options,
        });

        deckgl.setProps({
            layers: [hexagonLayer],
        });
    }
}

function numbers1() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
        counter.innerText = "0";
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 200;
            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 1);
            } else counter.innerText = target;
        };
        updateCounter();
    });
}

function title() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml1 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );

    anime
        .timeline({ loop: false })
        .add({
            targets: ".ml1 .letter",
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 3200,
            delay: (el, i) => 270 * (i + 1),
        })
        .add({
            targets: ".ml1 .line",
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 2500,
            offset: "-=875",
            delay: (el, i, l) => 280 * (l - i),
        });
    // .add({
    //     targets: ".ml1",
    //     opacity: 0,
    //     duration: 1000,
    //     easing: "easeOutExpo",
    //     delay: 1000,
    // });
}
