
(function () {

    function replaceMethod() {
        setTimeout(() => {
            const aArray = document.querySelectorAll('.content-wrapper a');
            const addCopy = document.querySelector("#http_project_clone");
            console.log("获取所有的a标签", addCopy);

            if (addCopy) addCopy.value = addCopy.value.replace(/^http:\/\/gitlab.yanhuamedical.com/, 'http://110.185.169.13:90');

            aArray.forEach(p => {
                if (/^http:\/\/gitlab.yanhuamedical.com/.test(p.href)) p.href = p.href.replace(/^http:\/\/gitlab.yanhuamedical.com/, '');
            });
        }, 500);
    }

    function overwriteHistory() {
        const newPushState = history.pushState;
        const newReplaceState = history.replaceState;
        const newGo = history.go;
        const newBack = history.back;

        history.pushState = function (...args) {
            newPushState.call(this, ...args);
        }
        history.replaceState = function (...args) {
            newReplaceState.call(this, ...args);
        }
        history.go = function (...args) {
            newGo.call(this, ...args);
        }
        history.back = function (...args) {
            newBack.call(this, ...args);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        console.log('我被执行了!');

        document.addEventListener('click', (e) => {
            queueMicrotask(() => {
                replaceMethod();
            })
        });

        replaceMethod();

    });
}())
