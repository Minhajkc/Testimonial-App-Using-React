import React, { useState } from 'react';
import Users from '../Users.json';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Modal() {
  const [likeCounts, setLikeCounts] = useState(Users.map(() => 0));
  const [comments, setComments] = useState(Users.map(() => []));
  const [currentComments, setCurrentComments] = useState(Users.map(() => ''));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index] += 1;
    setLikeCounts(newLikeCounts);
  };

  const handleCommentChange = (event, index) => {
    const newComments = [...currentComments];
    newComments[index] = event.target.value;
    setCurrentComments(newComments);
  };

  const handleAddComment = (index) => {
    if (currentComments[index].trim()) {
      const newComments = [...comments];
      newComments[index].push(currentComments[index]);
      setComments(newComments);

      const newCurrentComments = [...currentComments];
      newCurrentComments[index] = '';
      setCurrentComments(newCurrentComments);
    }
  };

  const settings = {
   
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentIndex(current)  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 ">
      <div className="bg-white shadow-2xl rounded-2xl border-black max-w-sm w-full mx-4">
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-4 text-center">TESTIMONIALS</h2>
          <Slider {...settings}>
            {Users.map((user, index) => (
              <div key={user.name} className="mb-4 text-center ">
                <div className='bg-red text-center flex justify-center'>
               <img
                    src={user.photo_url}
                    alt={user.name}
                    className="  h-48 object-cover rounded"
                  />
                  </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-700">{user.description}</p>
                </div>
                <div className="flex items-center justify-between  mt-6 py-2 border-t">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleLike(index)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      <i className="fas fa-thumbs-up"></i>
                      <span className="ml-2">{likeCounts[index]} Like</span>
                    </button>
                   
                  </div>
                  <div className="flex items-center ">
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 mr-2 focus:outline-none"
                      placeholder="Add a comment"
                      value={currentComments[index]}
                      onChange={(e) => handleCommentChange(e, index)}
                    />
                    
                    <button
                      onClick={() => handleAddComment(index)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      Comment
                    </button>
                  
                  </div>
                  
                </div>
                <div className="overflow-y-auto p-4">
                  {comments[index].length > 0 && (
                    <ul className="list-disc pl-5">
                      {comments[index].map((comment, idx) => (
                        <li key={idx} className="mt-2">{comment}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Modal;
