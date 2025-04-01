/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditDraft from "../components/EditDraft";
import Navbar from "../components/Navbar";
import { FileText, Plus, Edit3, Trash2, Clock, Search } from "lucide-react";
import { FaGoogleDrive } from "react-icons/fa";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const [editingDraft, setEditingDraft] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDrafts();
    }
  }, [user]);

  const fetchDrafts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/draft/${user._id}`);
      setDrafts(res.data);
    } catch (err) {
      console.error("Error fetching drafts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (draft) => {
    setEditingDraft(draft);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      try {
        await axios.delete(`http://localhost:5000/draft/${id}`);
        fetchDrafts();
      } catch (err) {
        console.error("Error deleting draft:", err);
      }
    }
  };

  const handleSaveToDrive = (draft) => {
    const title = draft.title;
    const content = draft.content;

    // Create a new Blob with the content of the draft
    const blob = new Blob([content], { type: 'text/plain' });
    const file = new File([blob], title, { type: 'text/plain' });

    // Open the Google Drive Picker
    const uploader = new GoogleDriveUploader(file);
    uploader.openPicker();
  };

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-700">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {getGreeting()}, {user.name.split(" ")[0]}
              </h1>
              <p className="text-gray-600 mt-1">Manage your drafts and documents</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drafts..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => navigate("/draft")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-md whitespace-nowrap"
              >
                <Plus size={18} />
                New Draft
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <FileText size={20} />
                My Drafts
              </h2>
              {!isLoading && (
                <span className="text-sm text-gray-500">
                  {drafts.length} {drafts.length === 1 ? "draft" : "drafts"}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredDrafts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredDrafts.map((draft) => (
                  <li key={draft._id} className="p-6 hover:bg-gray-50 transition duration-150">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{draft.title}</h3>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(draft.updatedAt)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{draft.content}</p>
                      <div className="flex space-x-3 pt-3">
                        <button
                          onClick={() => handleEdit(draft)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition duration-200"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(draft._id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-sm font-medium transition duration-200"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                        <button
                          onClick={() => handleSaveToDrive(draft)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-md text-sm font-medium transition duration-200"
                        >
                          <FaGoogleDrive size={16} />
                          Save to Drive
                        </button>
                        {draft.fileUrl && (
                          <a
                            href={draft.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition duration-200"
                          >
                            <FaGoogleDrive size={16} />
                            Preview on Drive
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center">
                {searchTerm ? (
                  <>
                    <p className="text-gray-500">No drafts found matching your search.</p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">You don't have any drafts yet.</p>
                    <button
                      onClick={() => navigate("/draft")}
                      className="mt-4 flex items-center gap-2 mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                    >
                      <Plus size={18} />
                      Create Your First Draft
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {editingDraft && (
        <EditDraft draft={editingDraft} onClose={() => setEditingDraft(null)} onSave={fetchDrafts} />
      )}

      {notification && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="text-white">{notification.message}</p>
        </div>
      )}
    </div>
  );
};

class GoogleDriveUploader {
  constructor(file) {
    this.file = file;
    this.developerKey = import.meta.env.GOOGLE_API_KEY;
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    this.scope = ['https://www.googleapis.com/auth/drive.file'];
    this.pickerApiLoaded = false;
  }

  openPicker() {
    gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
    gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
  }

  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        'client_id': this.clientId,
        'scope': this.scope,
        'immediate': false
      },
      this.handleAuthResult.bind(this));
  }

  onPickerApiLoad() {
    this.pickerApiLoaded = true;
    this.createPicker();
  }

  createPicker() {
    if (this.pickerApiLoaded && gapi.auth.getToken() != null) {
      const view = new google.picker.View(google.picker.ViewId.DOCS);
      view.setMimeTypes("application/vnd.google-apps.folder");

      const picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(this.clientId)
        .setOAuthToken(gapi.auth.getToken().access_token)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(this.developerKey)
        .setCallback(this.pickerCallback.bind(this))
        .build();
      picker.setVisible(true);
    }
  }

  pickerCallback(data) {
    if (data.action === google.picker.Action.PICKED) {
      const file = data.docs[0];
      const accessToken = gapi.auth.getToken().access_token;
      const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink`;

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify({
        'name': this.file.name,
        'parents': [file.id]
      })], { type: 'application/json' }));
      form.append('file', this.file);

      fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
        body: form
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
          setNotification({
            type: "success",
            message: `Draft saved successfully to Google Drive. Public link: ${data.webViewLink}`,
          });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          setNotification({
            type: "error",
            message: "Failed to save to Google Drive.",
          });
          setTimeout(() => setNotification(null), 5000);
        });
    }
  }

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      this.createPicker();
    }
  }
}

export default Dashboard;