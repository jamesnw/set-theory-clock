// @ts-check
(function () {
    /**
     * getLights
     * @returns HTMLCollection
     */
    function getLights() {
        return document.getElementsByClassName('light');
    }
    /**
     * 
     * @param {HTMLCollection} lights
     * @returns {boolean[]}
    */
    function getCurrentStates(lights) {
        return [...lights].map(light => light.classList.contains('on'))
    }
    /**
     * 
     * @param {Date} date
     * @returns {boolean[]}
    */
    function getStatesForTime(date) {
        const states = [];
        states.push(date.getSeconds() % 2 === 0);

        const hours = date.getHours();
        const fiveHours = Math.floor(hours / 5);
        for (let light = 0; light <= 3; light++) {
            states.push(fiveHours > light);
        }
        const oneHours = hours % 5;
        for (let light = 0; light <= 3; light++) {
            states.push(oneHours > light);
        }

        const minutes = date.getMinutes();
        const fiveMinutes = Math.floor(minutes / 5);
        for (let light = 0; light <= 10; light++) {
            states.push(fiveMinutes > light);
        }
        const oneMinutes = minutes % 5;
        for (let light = 0; light <= 3; light++) {
            states.push(oneMinutes > light);
        }

        return states;
    }
    /**
     * 
     * @param {HTMLCollection} lights
     * @param {boolean[]} states
     */
    function updateLights(lights, states) {
        [...lights].forEach((light, index) => {
            if (states[index]) light.classList.add('on')
            else light.classList.remove('on')
        })
    }
    /**
     *  @param {Date} date
     */
    function currentTime(date){
        return date.toLocaleTimeString('en-us', {hour12: false});
    }
    /**
     *  @param {string} time
     */
    function updateTime(time){
        const timeSpan = document.getElementById('time');
        timeSpan.innerText = time;
    }
    let lastUpdatedTime;
    function redraw() {
        const date = new Date();
        const newTime = currentTime(date);

        // Since we're checking for updates 60 times per second, only make changes if things have changed 
        if(newTime == lastUpdatedTime) return;
        lastUpdatedTime = newTime;

        const statesForTime = getStatesForTime(date);

        const lights = getLights();
        updateLights(lights, statesForTime);
        updateTime(lastUpdatedTime);
    }

    redraw();
    setInterval(redraw, 1000/60);
})();
