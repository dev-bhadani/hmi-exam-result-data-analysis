<template>
    <div class="container-fluid">

        <!--header-->
        <div class="header">
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="collapse navbar-collapse" id="navbarSupportedContent" style="width:100%;">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"> <a class="nav-link" style="color:white;"><b>Add Files</b></a> </li>
                        <li class="nav-item">
                            <form style="margin-left:16px;"
                                class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <input class="form-control" type="file" id="formFileMultiple" multiple
                                    @change="selectedFile" />
                            </form>
                        </li>
                        <li class="nav-item" style="margin-left:16px;"><a style="color:black;">
                                <p>Enrollment Number : {{ selectedEnrollmentNumber }}</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <marquee>Total Student: {{ totalStudent }} Pass Student :{{ passStudent }} Fail Student :{{failStudent}}</marquee>
            </nav>
        </div>
        <!--End header-->

        <!--sidebar-->
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-2" style="margin-top: 5px;">
                    <div class="sidebar sidebar-offcanvas bg-light" style="overflow: scroll; height: 545px;">
                        <ul class="list-group">
                            <li class="list-group-item bg-primary" style="color:white;"><span>
                                    <center><b>Matriculation Number</b></center>
                                </span></li>
                            <li class="list-group-item bg-primary" v-for="ee in info" :key="ee.id">


                                <center> <button type="button"
                                        class="list-group-item list-group-item-action btn-primary" style="width: 150px;"
                                        v-on:click="showModal(ee.id, ee.Enrollment[0])"> <span><input type="checkbox"
                                                @click="check(ee)" /> {{ ee.Enrollment[0]
                                                }}</span> </button> </center>
                            </li>
                        </ul>
                        <div class="sidefooter">
                            <center> <button type="button" class="list-group-item list-group-item-action btn-primary"
                                    style="width: 150px;" @click="del"><span>Delete</span> </button> </center>
                        </div>
                    </div>

                </div>
                <!--End Siderbar-->

                <!--Main Content-->
                <div class="col-md-10" style="overflow: scroll; height: 545px; margin-top: 5px;">
                    <div class="row" v-for="(ee, index) in info1" :key="ee.id">
                        <table class="table-responsive"
                            style="width: 100%; border: 1px solid black; background: #e4dcdc; padding-bottom: 5px;">
                            <tr>
                                <td style="width: 80px; border-right: 1px solid black;" rowspan="2">
                                    <center><b><span style="color:red;">Points:</span></b></center>
                                </td>
                                <td style="width: 150px;"> <span
                                        style="margin-left: 10px; color:blue;"><b>Question:</b></span><span
                                        style="margin-left:15px;"><b>({{ ee.question_type }})</b></span> </td>
                                <td rowspan="2"><span><b>{{ ee.question_numbers }})</b></span><span
                                        style="margin-left:5px; text-align:center;">{{ ee.question }}</span></td>
                            </tr>
                            <tr>
                                <td> <br /> </td>
                            </tr>
                            <tr>
                                <td rowspan="2" style="border-right: 1px solid black;">
                                    <center><input type="number" :id='index + 1' style="width: 50px;" min="0"
                                            :max="ee.totol_point" v-model="ee.archive_point"
                                            @change="archivedPoints(ee.archive_point, ee.totol_point, $event)" />
                                        / <span> {{
                                                ee.totol_point
                                        }}</span></center>
                                </td>
                                <td>
                                    <center><b><span style="color:green;">Correct Answer:</span></b></center>
                                </td>
                                <td>{{ ee.Correct_Answer ? ee.Correct_Answer : ' ' }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <center><b><span style="color:orange;">Your Responce:</span></b></center>
                                </td>
                                <td>{{ ee.Your_response }}</td>
                            </tr>
                        </table> <br />
                    </div>
                </div>
                <!--End Main Content-->

            </div>
        </div>

        <!--Footer-->
        <div class="footer">
            <footer class="bg-light text-center text-lg-start">
                <div class="text-center p-3 bg-primary">
                    <a style="color: white;">Points: {{ gradePoint ? gradePoint : '' }} Score :{{
                            gradePoint ? total_Score(gradePoint) : ''
                    }}</a>
                </div>
            </footer>
            <!-- End Footer -->

        </div>
    </div>
</template>
<script>
import axios from "axios"
import { ref } from "vue"
export default {
    name: "aboutPage",
    data() {
        return {
            info: null,
            info1: null,
            gradePoint: null,
            // textbox: '',
            checkedNames: [],
            selectedEnrollmentNumber: null,
            temp: null,
            totalStudent: null,
            failStudent : null,
            passStudent : null
        }
    },

    mounted() {
        this.fetchDetails();

    },
    methods: {
        total_Student() {
            // axios
            //     .get('http://localhost:3000/numbers')
            //     .then(response => {
            //         // showModal(this.info[0].id,this.info[0].Enrollment[0]);
            //         (this.info = response.data)
            //     })
        },
        check(item) {
            console.log("item", item);
            if (!this.checkedNames.length || !this.checkedNames.find(f => item.id === f.id)) {
                this.checkedNames.push(item)
            } else {
                this.checkedNames = this.checkedNames.filter(f => item.id !== f.id)
            }
        },
        del() {
            this.checkedNames.map(candle => {
                axios
                    .delete(`http://localhost:3000/numbers/${candle.id}`)
                    .then(response => {
                        axios
                            .delete(`http://localhost:3000/data/${candle.id}`)
                            .then(response => {
                                location.reload();
                                (this.info = response.data)
                            })
                        console.log("PPPPP", response);
                        (this.info = response.data)
                    })
            })
        },
        fetchDetails() {
            axios
                .get('http://localhost:3000/numbers')
                .then(response => {
                    this.info = response.data;
                    const length = Object.keys(this.info).length;
                    this.totalStudent = length;
                    console.log("sadsad", this.info.length);
                    let pass=0;
                    let fail =0;
                     this.info.map(candle => {
                        if(candle.total_score>45){
                            pass= pass+1;
                        }
                        else{
                            fail= fail+1;
                        }
                        this.passStudent=pass;
                         this.failStudent=fail;

                       console.log("candle",candle.total_score);
                    })
                    console.log("sadsad", this.info[0]);
                    this.showModal(this.info[0]?.id, this.info[0]?.Enrollment[0]);
                })
            // showModal(this.info[0].id,this.info[0].Enrollment[0]);


        },
        showModal(dd, ee) {
            console.log("function is called", dd)
            axios
                .get(`http://localhost:3000/data/${dd}`)
                .then(response => {
                    let x = 0;
                    response.data[ee].map(candle => {
                        x = x + parseInt(candle.archive_point);
                    })
                    this.gradePoint = x;
                    this.temp = x;
                    this.info1 = response.data[ee],
                        this.selectedEnrollmentNumber = this.info1[0].enrollment_number
                    // console.log("dsfsf", this.info1[0].enrollment_number);
                })
        },
        total_Score: function (tp) {
            console.log(tp)
            let points;

            switch (true) {
                case tp <= 45:
                    points = "5.0";
                    break;

                case tp >= 90 && tp <= 100:
                    points = "1.0";
                    break;

                case tp >= 80 && tp <= 90:
                    points = "1.6";
                    break;
                case tp >= 65 && tp <= 80:
                    points = "2.6";
                    break;
                case tp >= 50 && tp <= 65:
                    points = "3.6";
                    break;

                default:
                    points = "Undefined!!";
                    break;

            }
            return points;

        },


        archivedPoints: function (archivePoints, totalPoint, new_val) {
            console.log("archivePoints", archivePoints)
            console.log("totalPoint", totalPoint)
            console.log("new_val", new_val)
            let x = 0;
            // x = this.gradePoint - archivePoints;

            // this.gradePoint = x + parseInt(new_val.target.value);
            // console.log("temp",this.temp,"ARCIVE",parseInt(archivePoints),"NEW_VAL",parseInt(new_val.target.value))
            // console.log("ttttttttt",this.temp -parseInt(archivePoints)+ parseInt(new_val.target.value))
            x = this.gradePoint - parseFloat(totalPoint) + parseFloat(archivePoints);
            this.gradePoint = parseFloat(x);
            console.log("temp", this.gradePoint)
        }

    },
    setup() {
        let dropzoneFile = ref("");
        const selectedFile = async () => {
            dropzoneFile.value = document.querySelector("#formFileMultiple").files;
            await createJson(dropzoneFile.value);
            // await fetchDetails();
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
                        const dd = totalScore(final_obj);
                        enrollmentJson(enrollment_obj, dd);
                    };
                    reader.onerror = (err) => console.log(err);
                    reader.readAsText(dropzoneFile.value[index]);
                }
            }
        }
        function addJson(dd) {
            console.log("DDDDDD-----", dd);
            try {
                axios.post("http://localhost:3000/data", { [dd[0].enrollment_number]: dd }).then((res) => {
                    console.log("res", res);
                })
            } catch (error) {
                console.log(error)
            }
        }
        function totalScore(cc) {
            let y = 0;
            for (let index = 0; index < cc.length; index++) {
                y = y + parseInt(cc[index].archive_point);
            }
            return y;
            // console.log(y)
        }
        function enrollmentJson(ee, totalScore) {
            console.log("EE", ee);

            try {
                axios.post("http://localhost:3000/numbers", { Enrollment: ee, total_score: totalScore }).then((res) => {
                    location.reload()
                    console.log("res", res);
                })
            } catch (error) {
                console.log(error)
            }

        }
        // function fetchDetails() {
        //     axios
        //         .get('http://localhost:3000/numbers')
        //         .then(response => {
        //             (this.info = response.data)
        //         })

        // }

        return { dropzoneFile, selectedFile };
    }
}
</script>

<style scoped>
/* li {
    display: inline-block;
}
li div:last-child {
    display: inline;
} */
/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */
</style>