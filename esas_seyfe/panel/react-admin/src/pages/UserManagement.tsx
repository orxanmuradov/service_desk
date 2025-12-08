import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import type { User } from '../types';

const UserManagement: React.FC = () => {
    const { allUsers, setAllUsers } = useData();
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({
        username: '',
        password: '',
        roles: []
    });

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            password: user.password, // Ideally shouldn't expose password, but original logic does
            roles: user.roles
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        const user = allUsers.find(u => u.id === id);
        if (user && window.confirm(`"${user.username}" istifadəçisini silmək istədiyinizə əminsiniz?`)) {
            setAllUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            // Update existing
            setAllUsers(prev => prev.map(u =>
                u.id === editingUser.id
                    ? { ...u, ...formData } as User
                    : u
            ));
        } else {
            // Create new
            const newUser: User = {
                id: Date.now(), // Simple ID generation
                username: formData.username!,
                password: formData.password!,
                roles: formData.roles || []
            };
            setAllUsers(prev => [...prev, newUser]);
        }

        setShowModal(false);
        setEditingUser(null);
        setFormData({ username: '', password: '', roles: [] });
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData(prev => ({ ...prev, roles: selectedOptions }));
    };

    return (
        <div className="container-fluid px-4">
            <div className="row my-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom-0 py-3 d-flex justify-content-between align-items-center">
                            <h4 className="card-title mb-0 text-primary fw-bold"><i className="fas fa-users-cog me-2"></i>İstifadəçi İdarəetməsi</h4>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setEditingUser(null);
                                    setFormData({ username: '', password: '', roles: [] });
                                    setShowModal(true);
                                }}
                            >
                                <i className="fas fa-user-plus me-2"></i>Yeni İstifadəçi
                            </button>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light text-secondary">
                                        <tr>
                                            <th scope="col" className="ps-4">#</th>
                                            <th scope="col">İstifadəçi Adı</th>
                                            <th scope="col">Parol</th>
                                            <th scope="col">Rollar</th>
                                            <th scope="col" className="text-end pe-4">Əməliyyatlar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.map((user, index) => (
                                            <tr key={user.id}>
                                                <th scope="row" className="ps-4">{index + 1}</th>
                                                <td className="fw-bold">{user.username}</td>
                                                <td className="text-muted"><small>••••••••</small></td>
                                                <td>
                                                    {user.roles.map(role => (
                                                        <span key={role} className="badge bg-info text-dark me-1">{role}</span>
                                                    ))}
                                                </td>
                                                <td className="text-end pe-4">
                                                    <button className="btn btn-sm btn-light text-primary me-2" onClick={() => handleEdit(user)} title="Redaktə et">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(user.id)} title="Sil">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingUser ? 'İstifadəçini Redaktə Et' : 'Yeni İstifadəçi Yarat'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">İstifadəçi Adı</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            value={formData.username}
                                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Parol</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required={!editingUser}
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <small className="text-muted">Test mühiti olduğu üçün parol açıq görünür.</small>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Rollar (Ctrl + klik ilə çox seçim)</label>
                                        <select
                                            className="form-select"
                                            multiple
                                            value={formData.roles}
                                            onChange={handleRoleChange}
                                            size={6}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Viewer">Viewer</option>
                                            <option value="Help Desk">Help Desk</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Database">Database</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer px-0 pb-0">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Bağla</button>
                                        <button type="submit" className="btn btn-primary">Yadda Saxla</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
