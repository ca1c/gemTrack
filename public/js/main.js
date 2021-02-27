const app = new Vue({
    el: "#app",
    data: {
        obs1: "",
        obs2: "",
        obs3: "",
        sequence: [6, 0, 4, 5, 1, 3, 2, 0, 0, 5, 1, 0, 3, 4, 0, 0, 5, 0, 1, 0],
        nextGem: "",
        nextGemIndex: "",
        sequenceNotSynced: true,
        src: "tree2.webp",
        img: 1,
        transitioning: false,
    },
    methods: {
        findThree: function(three) {
            const sequence = [6, 0, 4, 5, 1, 3, 2, 0, 0, 5, 1, 0, 3, 4, 0, 0, 5, 0, 1, 0];

            for(let i = 0; i < sequence.length; i++) {
                if(three[0] === sequence[i]) {
                    if(typeof(sequence[i + 1]) !== "undefined" && typeof(sequence[i + 2]) !== "undefined") {
        
                        if(sequence[i + 1] === three[1] && sequence[i + 2] === three[2]) {
                            return [i + 3, sequence[i + 3]];
                        }
        
                    } 
                    else if(typeof(sequence[i + 1]) === "undefined" || typeof(sequence[i + 2]) === "undefined") {
                        let second;
                        let third;
        
                        second = typeof(sequence[i + 1]) === "undefined" ? sequence[0] : sequence[i + 1];
                        third = typeof(sequence[i + 2]) === "undefined" ? typeof(sequence[i + 1]) === "undefined" ? sequence[1] : sequence[0] : sequence[i + 2];
        
                        if(second === three[1] && third === three[2]) {
                            let finalIndex = sequence.indexOf(third);
                            return [finalIndex + 1, sequence[finalIndex + 1]];
                        }
                    }
                }
            }
        },
        findNextGem: function() {
            let nextGem = this.findThree([parseInt(this.obs1), parseInt(this.obs2), parseInt(this.obs3)]);
            this.nextGem = nextGem[1];
            this.nextGemIndex = nextGem[0];

            this.$cookies.set("nextGem", this.nextGem);
            this.$cookies.set("nextGemIndex", this.nextGemIndex);
            console.log(this.obs1);
        },
        checkInputSeq: function() {
            this.$cookies.set("obs1", this.obs1);
            this.$cookies.set("obs2", this.obs2);
            this.$cookies.set("obs3", this.obs3);
            if(this.obs1 !== "" && this.obs2 !== "" && this.obs3 !== "" && this.sequenceNotSynced === true) {
                this.findNextGem();
                this.sequenceNotSynced = false;
                this.$cookies.set("sequenceNotSynced", this.sequenceNotSynced);
            }
        },
    },
    created: function(){
        let vm = this;

        vm.obs1 = this.$cookies.isKey("obs1") ? this.$cookies.get("obs1") : "";
        vm.obs2 = this.$cookies.isKey("obs2") ? this.$cookies.get("obs2") : "";
        vm.obs3 = this.$cookies.isKey("obs3") ? this.$cookies.get("obs3") : "";
        vm.sequenceNotSynced = this.$cookies.isKey("sequenceNotSynced") ? this.$cookies.get("sequenceNotSynced") : true;
        vm.nextGem = this.$cookies.isKey("nextGem") ? this.$cookies.get("nextGem") : "";
        vm.nextGemIndex = this.$cookies.isKey("nextGemIndex") ? this.$cookies.get("nextGemIndex") : "";

        window.addEventListener('keyup', function(e) {
            if(e.keyCode == 32) {
                if(vm.sequenceNotSynced !== true && vm.transitioning !== true) {
                    vm.transitioning = true;
                    vm.nextGem = vm.nextGemIndex === 19 ? vm.sequence[0] : vm.sequence[vm.nextGemIndex + 1];
                    vm.nextGemIndex = vm.nextGemIndex === 19 ? 0 : vm.nextGemIndex + 1;

                    vm.$cookies.set("nextGem", vm.nextGem);
                    vm.$cookies.set("nextGemIndex", vm.nextGemIndex);

                    let srcs = ["bush", "mushroom", "tree1", "tree2", "tree3", "trunk_fallen", "trunk"];

                    vm.src = srcs[Math.floor(Math.random() * srcs.length)] + ".webp";

                    let imgPrev = vm.img;
                    vm.img = 2;

                    setTimeout(function() {
                        vm.img = imgPrev === 1 ? 3 : 1;
                        vm.transitioning = false;
                    }, 500);
                }
            }
        })
    }
})