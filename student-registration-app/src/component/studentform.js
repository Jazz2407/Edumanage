import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './studentform.css';

const StudentForm = () => {
  const [searchId, setSearchId] = useState('');
  const [students, setStudents] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    studentId: '', fullName: '', email: '', phone: '', dob: '',
    gender: '', course: '', department: '', address: '', emergencyContact: ''
  });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    const { data } = await supabase.from('students').select('*').order('studentId', { ascending: false });
    if (data) setStudents(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('students').insert([formData]);
    setIsSubmitting(false);
    if (error) setMsg({ text: error.message, type: 'error' });
    else {
      setMsg({ text: 'Student Registered Successfully', type: 'success' });
      fetchStudents();
      setFormData({ studentId: '', fullName: '', email: '', phone: '', dob: '', gender: '', course: '', department: '', address: '', emergencyContact: '' });
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase.from('students').update(viewData).eq('studentId', viewData.studentId);
    if (error) setMsg({ text: error.message, type: 'error' });
    else {
      setMsg({ text: 'Record Updated', type: 'success' });
      setIsEditing(false);
      fetchStudents();
    }
  };

  const handleRetrieve = async () => {
    const { data } = await supabase.from('students').select('*').eq('studentId', searchId).maybeSingle();
    if (data) { 
      setViewData(data); 
      setIsEditing(false); 
      setMsg({ text: 'Record Retrieved', type: 'success' });
    } else {
      setMsg({ text: 'Record Not Found', type: 'error' });
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">EM</div>
          <div className="logo-info">
            <h3>EduManage</h3>
          </div>
        </div>

        <div className="sidebar-content">
          <form className="registration-form" onSubmit={handleCreate}>
            <p className="section-label">NEW REGISTRATION</p>
            <div className="input-row">
              <input placeholder="Roll No" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} required />
              <input placeholder="Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
            </div>
            <div className="input-row">
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              <input placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            </div>
            <div className="input-row">
              <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} required />
              <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} required>
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="input-row">
              <input placeholder="Course" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} required />
              <input placeholder="Dept" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
            </div>
            <textarea placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
            <input placeholder="Emergency Contact" value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} required />
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register Student'}
            </button>
          </form>

          <div className="recent-activity">
            <p className="section-label">RECENT ACTIVITY</p>
            {students.slice(0, 5).map(s => (
              <div key={s.studentId} className="activity-item">
                <p>{s.fullName}</p>
                <span>Roll No: {s.studentId}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="search-group">
            <div className="search-input-wrapper">
              <label className="section-label">Student container</label>
              <input placeholder="Search Roll Number..." value={searchId} onChange={e => setSearchId(e.target.value)} />
              {msg.text && <p className={`status-msg ${msg.type}`}>{msg.text}</p>}
            </div>
            <button onClick={handleRetrieve} className="btn-retrieve-black">Retrieve</button>
          </div>
        </header>

        {viewData && (
          <div className="profile-container fade-in">
            <div className="profile-header">
              <div className="profile-brand">
                <div className="avatar">{viewData.fullName.charAt(0)}</div>
                <div className="title-info">
                  {isEditing ? (
                    <input className="edit-h1" value={viewData.fullName} onChange={e => setViewData({...viewData, fullName: e.target.value})} />
                  ) : (
                    <h1>{viewData.fullName}</h1>
                  )}
                  <p>Status: <span className="active-tag">Active Student</span></p>
                </div>
              </div>

              <div className="header-actions">
                {isEditing ? (
                  <button className="btn-save-premium" onClick={handleUpdate}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    Save Changes
                  </button>
                ) : (
                  <button className="btn-edit-premium" onClick={() => setIsEditing(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                    Edit Details
                  </button>
                )}
              </div>
            </div>

            <div className="details-grid-3-col">
              <div className="data-box"><label>ROLL NUMBER</label><p>{viewData.studentId}</p></div>
              <div className="data-box"><label>FULL NAME</label><p>{viewData.fullName}</p></div>
              <div className="data-box">
                <label>EMAIL ADDRESS</label>
                {isEditing ? <input value={viewData.email} onChange={e => setViewData({...viewData, email: e.target.value})} /> : <p>{viewData.email}</p>}
              </div>

              <div className="data-box">
                <label>COURSE</label>
                {isEditing ? <input value={viewData.course} onChange={e => setViewData({...viewData, course: e.target.value})} /> : <p>{viewData.course}</p>}
              </div>
              <div className="data-box">
                <label>DEPARTMENT</label>
                {isEditing ? <input value={viewData.department} onChange={e => setViewData({...viewData, department: e.target.value})} /> : <p>{viewData.department}</p>}
              </div>
              <div className="data-box">
                <label>EMERGENCY CONTACT</label>
                {isEditing ? <input value={viewData.emergencyContact} onChange={e => setViewData({...viewData, emergencyContact: e.target.value})} /> : <p>{viewData.emergencyContact}</p>}
              </div>

              <div className="data-box">
                <label>DATE OF BIRTH</label>
                {isEditing ? <input type="date" value={viewData.dob} onChange={e => setViewData({...viewData, dob: e.target.value})} /> : <p>{viewData.dob}</p>}
              </div>
              <div className="data-box"><label>GENDER</label><p>{viewData.gender}</p></div>
              <div className="data-box">
                <label>PHONE NUMBER</label>
                {isEditing ? <input value={viewData.phone} onChange={e => setViewData({...viewData, phone: e.target.value})} /> : <p>{viewData.phone || 'N/A'}</p>}
              </div>

              <div className="data-box full-width">
                <label>PERMANENT ADDRESS</label>
                {isEditing ? <textarea value={viewData.address} onChange={e => setViewData({...viewData, address: e.target.value})} /> : <p>{viewData.address}</p>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentForm;