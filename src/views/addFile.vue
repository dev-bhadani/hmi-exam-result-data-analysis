<template>
    <div class="home">
        <h1>DropZone</h1>
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <span v-for="dropzoneFile in dropzoneFile" :key="dropzoneFile.id" class="file-info">{{ dropzoneFile.name
        }}</span>
        <!-- <span v-for="dropzoneFile in Dd" class="file-info">{{ dropzoneFile.Que }}</span> -->
        <!-- <p>{{ finalArray }}</p> -->
    </div>
</template>

<script>
import DropZone from "../components/DropZone.vue";
import { ref } from "vue";
import axios from "axios"
export default {
    name: "AddFilePage",
    components: {
        DropZone,
    },
    setup() {
        let dropzoneFile = ref("");
        const finalArray = ref("");
        const drop = async (e) => {
            dropzoneFile.value = e.dataTransfer.files;
            await createJson(dropzoneFile.value);
        };

        const selectedFile = async () => {
            dropzoneFile.value = document.querySelector(".dropzoneFile").files;
            await createJson(dropzoneFile.value);
            window.location.reload();
        };
        async function createJson(size) {

            for (let index = 0; index < size.length; index++) {
                const reader = new FileReader();
                if (dropzoneFile.value[index].name.includes(".txt")) {
                    reader.onload = (res) => {
                        this.content = res.target.result;
                    };
                    reader.onerror = (err) => console.log(err);
                    reader.readAsText(dropzoneFile.value);
                } else {
                    reader.onload = (res) => {
                        var cells = res.target.result.split('\n').map(function (el) { return el.split('/n'); });
                        var headings = cells.shift();

                        var out = cells.map(function (el) {
                            let obj = {};
                            for (var i = 0, l = el.length; i < l; i++) {
                                var data = el[i].split(":");
                                obj[data[0].replace(/\s/g, '_')] = data[1];
                            }
                            return obj;
                        });
                        var final_obj = [];
                        var temp_obj = {};
                        var enrollment_obj = [];
                        for (var i = 0, l = out.length; i < l; i++) {
                            if (i + 1 == out.length) {
                                final_obj = final_obj.concat(temp_obj);
                                enrollment_obj = enrollment_obj.concat(headings[0].split(":")[1].replace(/\s/g, ''));
                            }
                            if (out[i].Question) {
                                if (i != 0) {
                                    final_obj = final_obj.concat(temp_obj);
                                }
                                temp_obj = {};
                                var temp_q = out[i].Question.substring(9);
                                var question = out[i].Question.substring(9).slice(0, -3);
                                var question_mark = temp_q.substring(question.length - 2).split("]", "[")[0];
                                var question_numbers = out[i].Question.split(")")[1].replace(/\s/g, '');
                                var question_type = out[i].Question.split(")")[0].split("(")[1];
                                var enrollment_number = headings[0].split(":")[1].replace(/\s/g, '');

                                temp_obj = { ...temp_obj, question };
                                temp_obj = { ...temp_obj, enrollment_number };
                                temp_obj = { ...temp_obj, question_mark };
                                temp_obj = { ...temp_obj, question_numbers };
                                temp_obj = { ...temp_obj, question_type };

                            } else {
                                if (out[i].Points) {
                                    var totol_point = out[i].Points.split("/")[1].replace(/\s/g, '');
                                    var archive_point = out[i].Points.split("/")[0].replace(/\s/g, '');
                                    temp_obj = { ...temp_obj, totol_point };
                                    temp_obj = { ...temp_obj, archive_point };
                                } else {
                                    temp_obj = { ...temp_obj, ...out[i] };
                                }
                            }
                        }
                        addJson(final_obj);
                        enrollmentJson(enrollment_obj);
                    };
                    reader.onerror = (err) => console.log(err);
                    reader.readAsText(dropzoneFile.value[index]);
                }
            }
        }
        function addJson(dd) {
            axios.post("http://localhost:3000/data", { [dd[0].enrollment_number]: dd }).then((res) => {

                console.log("res", res);
            })
        }
        function enrollmentJson(ee) {
            axios.post("http://localhost:3000/numbers", { Enrollment: ee }).then((res) => {
                console.log("res", res);
            })
        }
        return { dropzoneFile, drop, selectedFile, finalArray };
    },
};
</script>

<style lang="scss" scoped>
.home {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    width: -webkit-fill-available;

    h1 {
        font-size: 40px;
        margin-bottom: 32px;
    }

    .file-info {
        margin-top: 32px;
    }
}
li {
    display: inline-block;
}
li div:last-child {
    display: inline;
}
</style>