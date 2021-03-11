"use strict"

const output = document.getElementById("output");

//read functionality
function getReviews() {
    axios.get("http://localhost:8080/getReview")
        .then(res => {
            output.innerHTML = "";

            const reviews = res.data;
            console.log(reviews);

                reviews.forEach(review => {
                    const newReview = renderReview(review);
                    console.log("Active Review: ", newReview);
                    attachBook(review.bookId);
                    output.appendChild(newReview);
                   });
                }).catch(err => console.error(err))
}

function renderReview(review) {
    const newColumn = document.createElement("div");
    newColumn.className = "col";

    const newReview = document.createElement("div");
    newReview.className = "card m-5";
    newColumn.appendChild(newReview);

    const reviewBody = document.createElement("div");
    reviewBody.className = "card-body";
    newReview.appendChild(reviewBody);

    const reviewTitle = document.createElement("h5");
    reviewTitle.className = "card-title";
    reviewTitle.innerText = review.reviewTitle;
    reviewBody.appendChild(reviewTitle);

    const reviewText = document.createElement("p");
    reviewText.className = "card-text";
    reviewText.innerHTML = "Rating: " + review.rating;
    reviewText.innerHTML += "<br>";
    reviewText.innerHTML +=  review.reviewBody;
    reviewText.innerHTML += "<br>";
    reviewText.innerHTML +=  review.bookId;

    reviewBody.appendChild(reviewText);

    const reviewFooter = document.createElement("div");
    reviewFooter.className = "card-footer"
    newReview.appendChild(reviewFooter);

    const deleteReviewButton = document.createElement("a");
    deleteReviewButton.className = "card-link";
    deleteReviewButton.innerText = "Delete";
    //deleteReviewButton.addEventListener('click', function () {
    //    deleteReview(book.id);
    //});

    reviewFooter.appendChild(deleteReviewButton);

    const updateReviewButton = document.createElement("a");
    updateReviewButton.className = "card-link";
    updateReviewButton.innerText = "Update";
    
    reviewFooter.appendChild(updateReviewButton);

    attachBook(review.bookId);
    
    //reviewBody.appendChild(bookText);

    return newColumn;
}



getReviews();

function attachBook(id){
    axios.get("http://localhost:8080/getBookID/"+ id)
        .then(res => {
            console.log(res.data);

            const book = res.data;

        })
        .catch(err => console.error(err));
}