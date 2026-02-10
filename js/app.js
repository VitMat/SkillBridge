let students = JSON.parse(localStorage.getItem("students")) || [];
let employers = JSON.parse(localStorage.getItem("employers")) || [];

$(document).ready(function(){

  $("#saveStudent").click(function(){
    students.push({
      name: $("#name").val(),
      skills: $("#skills").val().toLowerCase().split(",")
    });
    localStorage.setItem("students", JSON.stringify(students));
    $("#msg").text("Student saved.");
  });

  $("#saveEmployer").click(function(){
    employers.push({
      company: $("#company").val(),
      skills: $("#reqSkills").val().toLowerCase().split(",")
    });
    localStorage.setItem("employers", JSON.stringify(employers));
    $("#emsg").text("Opportunity posted.");
  });

  $("#runMatch").click(function(){
    let placements = [];

    students.forEach(st=>{
      let best=null, bestScore=0;

      employers.forEach(emp=>{
        let score=0;
        emp.skills.forEach(k=>{
          if(st.skills.includes(k.trim())) score++;
        });

        if(score>bestScore){
          bestScore=score;
          best=emp;
        }
      });

      if(best){
        placements.push(st.name + " → " + best.company);
      }
    });

    $("#stats").text(placements.length);
    $("#result").html(placements.map(p=>"<p>"+p+"</p>").join(""));
  });

});
