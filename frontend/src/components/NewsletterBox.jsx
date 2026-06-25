
const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className="text-center mt-8">
      <p className="text-gray-800 text-xl  md:text-2xl font-medium">
        Subscribe now & get 20% off
      </p>

      <p className="mt-3 text-gray-400">
        Join our newsletter to receive exclusive offers, new arrivals, and special discounts directly in your inbox.
      </p>

      <form
        onSubmit={onSubmitHandler}
        action=""
        className="w-full sm:w-1/2 flex items-center mx-auto mt-6 border border-gray-300"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none px-3 text-black"
          placeholder="Enter your email"
          required
        />

        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-6 sm:px-10 py-3 sm:py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox