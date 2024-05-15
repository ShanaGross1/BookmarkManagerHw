import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBookmark = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/add', { title, url })
        navigate('/mybookmarks');
    }
    return (

        <div className="container" style={{ marginTop: 80 }} >
            <main role="main" className="pb-3">
                <div className="row" style={{ minHeight: 80 }}>
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Add Bookmark</h3>
                        <form onSubmit={onFormSubmit }>
                            <input type="text" placeholder="Title" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                            <br />
                            <input type="text" placeholder="Url" className="form-control" value={url} onChange={e => setUrl(e.target.value)} />
                            <br />
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default AddBookmark;