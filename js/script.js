// بيانات المساعدات
let aids = [
    {type: "غذاء", location: "دير البلح", date: "2026-01-20", org: "UNRWA"},
    {type: "دواء", location: "الشجاعية", date: "2026-01-21", org: "الهلال الأحمر"},
    {type: "مياه", location: "خانيونس", date: "2026-01-22", org: "UNICEF"},
    {type: "إيواء", location: "رفح", date: "2026-01-23", org: "UNHCR"},
    {type: "غذاء", location: "بيت لاهيا", date: "2026-01-24", org: "WFP"}
];

// ألوان البطاقات حسب نوع المساعدة
let aidColors = {
    "غذاء": "card-food",
    "دواء": "card-medicine",
    "مياه": "card-water",
    "إيواء": "card-shelter"
};

// دالة عرض البطاقات
function displayCards(data){
    let container = $("#cardsContainer");
    container.empty();
    if(data.length === 0){
        container.html('<p class="text-center fw-bold">لا توجد بيانات للعرض</p>');
        return;
    }
    data.forEach(aid => {
        let card = `
        <div class="col-md-4 mb-3">
            <div class="card ${aidColors[aid.type]} h-100">
                <div class="card-body">
                    <h5 class="card-title">${aid.type}</h5>
                    <p class="card-text"><strong>المنطقة:</strong> ${aid.location}</p>
                    <p class="card-text"><strong>التاريخ:</strong> ${aid.date}</p>
                    <p class="card-text"><strong>الجهة المانحة:</strong> ${aid.org}</p>
                </div>
            </div>
        </div>`;
        container.append(card);
    });
}

// عرض جميع البطاقات في البداية
displayCards(aids);

// فلترة حسب المنطقة
$("#filterRegion").change(function(){
    let selected = $(this).val();
    if(selected === "all"){
        displayCards(aids);
    } else {
        let filtered = aids.filter(aid => aid.location === selected);
        displayCards(filtered);
    }
});

// تسجيل طلب مساعدة
$("#aidForm").submit(function(e){
    e.preventDefault();
    let name = $("#name").val();
    let area = $("#area").val();
    let type = $("#aidType").val();

    if(name && area && type){
        $("#formMessage").text(`تم تسجيل طلبك، ${name}. سيتم التواصل معك قريبًا`).css("color","green");
        $(this)[0].reset();
    } else {
        $("#formMessage").text("يرجى تعبئة جميع الحقول").css("color","red");
    }
});