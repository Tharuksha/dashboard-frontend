import { useState } from "react";
import { Image } from "cloudinary-react";

const ManageBooks = () => {
  const [image, setImage] = useState(null);
  const [bookName, setBookName] = useState("");
  const [imgName, setImgName] = useState(""); // State to hold the image name
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("book_name", bookName); // Assuming you want to send the book name to Cloudinary
    data.append("cloud_name", "drndhbibq");
    data.append("upload_preset", "doba_test");
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drndhbibq/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setImgName(res.public_id); // Set image name (assuming public_id is the image name)
      setLoading(false);

      // Now, send the book details to your API
      uploadBookDetails(bookName, res.public_id);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const uploadBookDetails = async (bookName, imgName) => {
    const bookData = {
      bookName,
      imgName,
    };

    try {
      const response = await fetch('http://localhost:8080/books/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        console.log('Book details uploaded successfully');
      } else {
        console.error('Failed to upload book details');
      }
    } catch (error) {
      console.error('Error uploading book details:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
    setBookName("");
    setImgName("");
  };

  return (
    <div className="h-screen sm:px-8 md:px-16 sm:py-8 bg-white">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Enter book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="mb-3 px-3 py-1 border rounded-sm text-black"
          />
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-800 text-white hover:bg-gray-600 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" className="w-full" />}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            onClick={uploadImage}
            className="rounded-sm px-3 py-1 bg-blue-700 text-white hover:bg-blue-500 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
            disabled={!image || !bookName}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="rounded-sm px-3 py-1 bg-red-700 text-white hover:bg-red-500 focus:shadow-outline focus:outline-none"
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <div>
            {imgName && (
              <div className="pb-8 pt-4">
                <p className="text-black mb-2">Book Name: {bookName}</p>
                <Image
                  cloudName="dtsxmoqei"
                  publicId={imgName}
                  width="300"
                  crop="scale"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
