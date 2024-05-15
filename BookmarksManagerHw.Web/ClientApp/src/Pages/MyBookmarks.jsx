import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const MyBookmarks = () => {

    const { user } = useAuth();

    const [bookmarks, setBookmarks] = useState([]);
    const [editedRow, setEditedRow] = useState({
        title: '',
        id: 0
    })

    const getBookmarks = async () => {
        const { data } = await axios.get(`/api/bookmark/get`);
        setBookmarks(data)
    }

    useEffect(() => {
        getBookmarks();
    }, []);

    const onUpdateClick = async () => {
        await axios.post(`/api/bookmark/update`, { ...editedRow })
        await getBookmarks();
        setEditedRow({ title: '', id: 0 })
    }

    const onDeleteClick = async (id) => {
        await axios.post(`/api/bookmark/delete`, { id })
        await getBookmarks();
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: 20 }} >
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back {user.firstName} {user.lastName}</h1>
                            <a className="btn btn-primary btn-block" href="/addbookmark">Add Bookmark</a>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {bookmarks.map(b => (
                                    <tr key={b.id}>
                                        {editedRow.id !== b.id &&
                                            <>
                                                <td>{b.title}</td>
                                                <td> <a href={b.url} target="_blank">{b.url}</a> </td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() => setEditedRow({ id: b.id, title: b.title })}>Edit Title</button>
                                                    <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => onDeleteClick(b.id)} >Delete</button>
                                                </td>
                                            </>}

                                        {editedRow.id == b.id &&
                                            <>
                                                <td>
                                                    <input type="text" className="form-control" placeholder="Title" value={editedRow.title} onChange={e => setEditedRow({ ...editedRow, title: e.target.value })} />
                                                </td>
                                                <td>   <a href={b.url} target="_blank">{b.url}</a> </td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={onUpdateClick}>Update</button>
                                                    <button className="btn btn-info" onClick={() => setEditedRow({ id: 0, title: '' })}>Cancel</button>
                                                    <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => onDeleteClick(b.id)}>Delete</button>
                                                </td>
                                            </>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>)
}

export default MyBookmarks;