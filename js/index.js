const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(200, 0);
  if (carousel.scrollWidth !== 0)
    prev.style.display = "flex";
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width)
    next.style.display = "flex";

});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

$(document).ready(function () {
  //rendering the json data
  $.ajax({
    url: "https://doc.deepthought.education/files/ipx/details.json",
    dataType: 'json',
    error: function () {
      console.log('JSON FAILED for data');
    },
    success: function (results) {
      $("#coverName").text(results.data.coverName);
      $("#ownerName").text(results.data.ownerName);
      $("#coverFileUrl").attr('src', results.data.coverFileUrl)
      //Sale ends on 20 june, 2022 at 10:30pm, GMT +5:30
      let date = results.data.projectIndividualNfts[1].nftAuction.expiry;
      date = new Date(date).toString()
      $("#expiry").text("Sales ends on " + date);
    }
  })

  $.ajax({
    url: "https://doc.deepthought.education/files/ipx/nft.json",
    dataType: 'json',
    error: function () {
      console.log('JSON FAILED for data');
    },
    success: function (results) {
      $("#price").text("$" + results.data.nftDetails.price);
      $("#qty").text(results.data.nftDetails.qty);
      // results.data.participants.forEach(element => {
      //   var badge = document.getElementById('content');
      //   badge.className = 'item';

      // });
      badge = `iioj`
      i = 0
      let cont;
      for (const key in results.data.projectDetails.participants) {
        var badge = document.createElement('div');
        badge.className = 'item';
        badge.innerHTML = `
                        <img width="100%" src="images/scroll.png" />
                        <div class="lambi_main">
                            <div class="bird">
                                <div>
                                    <img src="`+ results.data.projectDetails.participants[i].fileUrl + `" alt="">
                                </div>
                                <div class="lambi">
                                    <b>`+ results.data.projectDetails.participants[i].firstName + `</b>
                                    <p>Owned by- `+ results.data.projectDetails.participants[i].lastName + `</p>
                                </div>
                            </div>
                            <div class="lambi_price flex-row">
                                <p>Price - INR 5,33,300</p>
                                <button class="grad">Buy Now</button>
                            </div>
                        </div>
        `
        // cont += results.data.projectDetails.participants[i].lastName
        document.getElementById('content').appendChild(badge);
        // alert(results.data.projectDetails.participants[i].lastName)
        i++;
      }
    }
  })

  // $.ajax({
  //   url: "https://doc.deepthought.education/files/ipx/list.json",
  //   dataType: 'json',
  //   error: function () {
  //     console.log('JSON FAILED for data');
  //   },
  //   success: function (results) {
  //     $('#content').text(results[0].projectIndividualNfts[0].purchaseList[0].ipxNftPurchaseRefUuid)
  //   }
  // })
});
