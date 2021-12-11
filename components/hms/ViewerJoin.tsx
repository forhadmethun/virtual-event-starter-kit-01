import React from 'react';

const ViewerJoin = () => {
  return (
    <div className="text-center">
      <h1>Join the conference.</h1>
      <p className="my-0 text-gray-300 text-sm">
        An interactive online experience by the community, free for everyone.
      </p>
      <form className="mt-12 space-x-4">
        <input
          required
          className="p-4 w-80 text-md bg-gray-600 rounded-lg placeholder:text-gray-400"
          placeholder="Enter your name to join the event"
          type="text"
        />
        <button
          type="submit"
          className="bg-brand-300 hover:bg-brand-200 px-4 py-3.5 rounded-lg cursor-pointer"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default ViewerJoin;
