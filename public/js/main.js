function findThree(three) {
    const sequence = [6, 0, 4, 5, 1, 3, 2, 0, 0, 5, 1, 0, 3, 4, 0, 0, 5, 0, 1, 0];

    for(let i = 0; i < sequence.length; i++) {
        if(three[0] === sequence[i]) {
            if(typeof(sequence[i + 1]) !== "undefined" && typeof(sequence[i + 2]) !== "undefined") {

                if(sequence[i + 1] === three[1] && sequence[i + 2] === three[2]) {
                    return sequence[i + 3];
                }

            } 
            else if(typeof(sequence[i + 1]) === "undefined" || typeof(sequence[i + 2]) === "undefined") {
                let second;
                let third;

                if(sequence.indexOf())
                second = typeof(sequence[i + 1]) === "undefined" ? sequence[0] : sequence[i + 1];
                third = typeof(sequence[i + 2]) === "undefined" ? typeof(sequence[i + 1]) === "undefined" ? sequence[1] : sequence[0] : sequence[i + 2];

                if(second === three[1] && third === three[2]) {
                    let finalIndex = sequence.indexOf(third);
                    return sequence[finalIndex + 1];
                }
            }
        }
    }
}

const app = new Vue({
    el: "#app",
    data: {
        obs1: "",
        obs2: "",
        obs3: "",
        nextGem: "",
    },
    methods: {
        findNextGem: function() {
            this.nextGem = findThree([parseInt(this.obs1), parseInt(this.obs2), parseInt(this.obs3)]);
            console.log(this.obs1);
        }
    }
})