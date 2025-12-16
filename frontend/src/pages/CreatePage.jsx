import { ArrowBigLeftIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../lib/axios.js';

const CreatePage = () => {
  const [title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend API
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
       await api.post("/notes",{
        title,
        content
       })
       toast.success("Note creates successfully!")
       navigate('/');
      
    } catch (error) {
      toast.error("Failed to create note");
      console.error("Error creating note:", error);
      
    }finally {
      setLoading(false);
    } 

  }

  return (
    <div className='min-h-screen bg-base-200 '>
      <div className="container mx-auto px-4 py-8 ">
        <div className="mx-auto max-w-2xl">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowBigLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className='card-body'>
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text"
                    className='input input-bordered w-full'
                    placeholder='Note title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                   
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    className='textarea textarea-bordered w-full'
                    placeholder='Write your note here...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                   
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary ' disabled={loading}>
                    {loading ? 'Creating...' : 'Create Note'}

                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default CreatePage