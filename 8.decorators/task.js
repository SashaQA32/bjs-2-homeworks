"use strict"

function cachingDecoratorNew(func) {
    let cache = [];

    function wrapper(...args) {
        const hash = args.join(',')
        let objectInCache = cache.findIndex((item) => item.hash === hash)
        if (objectInCache !== -1) {
            console.log("Из кэша: " + cache[objectInCache].value);
            return "Из кэша: " + cache[objectInCache].value;
        }
        let result = func(...args);
        cache.push({
            hash: args.join(','),
            value: result
        })
        if (cache.length > 5) {
            cache.splice(0, 1);
        }
        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;
    }
    return wrapper;
}

function debounceDecoratorNew(func, ms) {
    let checkFunc = false;
    return function(...args) {
        if (checkFunc == false) {
            func(...args);
            checkFunc = true;
            setTimeout(() => {
                checkFunc = false, func(...args)
            }, ms);
        }
    }
}

function debounceDecorator2(func) {
    let checkFunc = false;

    function wrapper(...args) {
        wrapper.count++;
        if (checkFunc == false) {
            func(...args);
            checkFunc = true;
            wrapper.count.push(i += 1)
            setTimeout(() => {
                checkFunc = false, func(...args)
            }, ms);
        }
    }
    wrapper.count = 0;
    return wrapper
}