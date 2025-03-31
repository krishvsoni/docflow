/* eslint-disable no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Bold,
  Italic,
  Underline,
  Type,
  Check,
  X,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  FileText,
  Share2,
} from "lucide-react";
import { io } from "socket.io-client";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const fonts = ["Arial", "Times New Roman", "Courier New", "Georgia", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS"];
const fontSizes = [
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "28",
  "32",
  "36",
  "42",
  "48",
  "56",
  "64",
  "72",
];
const letterFormats = [
  { id: "standard", name: "Standard Letter", description: "Default letter format" },
  { id: "business", name: "Business Letter", description: "Formal business correspondence" },
  { id: "formal", name: "Formal Letter", description: "Highly formal communication" },
  { id: "personal", name: "Personal Letter", description: "Casual personal correspondence" },
  { id: "cover", name: "Cover Letter", description: "Job application cover letter" },
];
const paperSizes = [
  { id: "a4", name: "A4", width: "210mm", height: "297mm" },
  { id: "letter", name: "US Letter", width: "8.5in", height: "11in" },
  { id: "legal", name: "US Legal", width: "8.5in", height: "14in" },
  { id: "a5", name: "A5", width: "148mm", height: "210mm" },
];

const socket = io("https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net");

export default function DraftPage({ user = { _id: "user123" } }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(fontSizes[4]);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [selectedText, setSelectedText] = useState(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [selectionFormat, setSelectionFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    font: fonts[0],
    fontSize: fontSizes[4],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [letterFormat, setLetterFormat] = useState(letterFormats[0]);
  const [paperSize, setPaperSize] = useState(paperSizes[0]);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareEmail, setShareEmail] = useState("");

  const contentEditableRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const formatDropdownRef = useRef(null);
  const sizeDropdownRef = useRef(null);

  useEffect(() => {
    socket.emit('joinDocument', user._id);

    socket.on('documentContent', (content) => {
      setContent(content);
    });

    return () => {
      socket.off('documentContent');
    };
  }, [user._id]);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = content;
    }
  }, [content]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formatDropdownRef.current && !formatDropdownRef.current.contains(event.target)) {
        setShowFormatDropdown(false);
      }
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
        setShowSizeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectionPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY - 50,
      });

      setSelectedText({
        text: selection.toString(),
        start: range.startOffset,
        end: range.endOffset,
      });
    } else {
      setSelectedText(null);
    }
  };

  const applyFormatToSelection = () => {
    if (!selectedText) return;

    document.execCommand("fontName", false, selectionFormat.font);
    document.execCommand("fontSize", false, getFontSizeValue(selectionFormat.fontSize));
    document.execCommand("bold", false, selectionFormat.bold ? "bold" : "");
    document.execCommand("italic", false, selectionFormat.italic ? "italic" : "");
    document.execCommand("underline", false, selectionFormat.underline ? "underline" : "");

    setContent(contentEditableRef.current.innerHTML);
    setSelectedText(null);
  };

  const getFontSizeValue = (size) => {
    const sizeMap = {
      "8": 1,
      "9": 1,
      "10": 2,
      "11": 2,
      "12": 3,
      "14": 4,
      "16": 4,
      "18": 5,
      "20": 5,
      "22": 5,
      "24": 6,
      "28": 6,
      "32": 6,
      "36": 7,
      "42": 7,
      "48": 7,
      "56": 7,
      "64": 7,
      "72": 7,
    };
    return sizeMap[size] || 3;
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleTextSelection);
    return () => {
      document.removeEventListener("selectionchange", handleTextSelection);
    };
  }, [content]);

  const formatTime = (date) => {
    if (!date) return "Not saved yet";
    return `Saved at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const applyLetterFormat = (format) => {
    setLetterFormat(format);
    setShowFormatDropdown(false);

    switch (format.id) {
      case "business":
        setFont("Arial");
        setFontSize("12");
        break;
      case "formal":
        setFont("Times New Roman");
        setFontSize("12");
        break;
      case "personal":
        setFont("Georgia");
        setFontSize("14");
        break;
      case "cover":
        setFont("Helvetica");
        setFontSize("12");
        break;
      default:
        setFont("Arial");
        setFontSize("12");
    }
  };

  const handleShare = async () => {
    try {
      await axios.post("https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/share", {
        email: shareEmail,
        docId: user._id,
      });
      setShowSharePopup(false);
      setShareEmail("");
      alert("Document shared successfully");
    } catch (error) {
      console.error("Error sharing document:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Untitled document"
            className="w-full text-2xl font-bold outline-none pb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-wrap items-center gap-3 py-2">
            <div className="flex items-center border-r border-gray-200 pr-3">
              <div className="relative">
                <select
                  className="appearance-none pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none bg-no-repeat bg-[center_left_0.5rem]"
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                  }}
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <Type className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center border-r border-gray-200 pr-3">
              <select
                className="appearance-none px-2 py-1.5 text-sm border border-gray-300 rounded-md outline-none"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
              <button
                onClick={() => setIsBold(!isBold)}
                className={`p-2 rounded-md hover:bg-gray-100 ${isBold ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
                title="Bold"
              >
                <Bold size={18} />
              </button>

              <button
                onClick={() => setIsItalic(!isItalic)}
                className={`p-2 rounded-md hover:bg-gray-100 ${isItalic ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
                title="Italic"
              >
                <Italic size={18} />
              </button>

              <button
                onClick={() => setIsUnderline(!isUnderline)}
                className={`p-2 rounded-md hover:bg-gray-100 ${isUnderline ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
                title="Underline"
              >
                <Underline size={18} />
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
              <button
                onClick={() => setAlignment("left")}
                className={`p-2 rounded-md hover:bg-gray-100 ${alignment === "left" ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
                title="Align Left"
              >
                <AlignLeft size={18} />
              </button>

              <button
                onClick={() => setAlignment("center")}
                className={`p-2 rounded-md hover:bg-gray-100 ${alignment === "center" ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
                title="Align Center"
              >
                <AlignCenter size={18} />
              </button>

              <button
                onClick={() => setAlignment("right")}
                className={`p-2 rounded-md hover:bg-gray-100 ${alignment === "right" ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
                title="Align Right"
              >
                <AlignRight size={18} />
              </button>
            </div>

            <div className="relative" ref={formatDropdownRef}>
              <button
                onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <FileText size={16} />
                <span>Format: {letterFormat.name}</span>
                <ChevronDown size={14} />
              </button>

              {showFormatDropdown && (
                <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="p-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Letter Format</h3>
                  </div>
                  <div className="max-h-60 overflow-auto">
                    {letterFormats.map((format) => (
                      <button
                        key={format.id}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${letterFormat.id === format.id ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => applyLetterFormat(format)}
                      >
                        <div>
                          <div className="font-medium">{format.name}</div>
                          <div className="text-xs text-gray-500">{format.description}</div>
                        </div>
                        {letterFormat.id === format.id && <Check size={16} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative ml-2" ref={sizeDropdownRef}>
              <button
                onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <span>Size: {paperSize.name}</span>
                <ChevronDown size={14} />
              </button>

              {showSizeDropdown && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="p-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Paper Size</h3>
                  </div>
                  <div>
                    {paperSizes.map((size) => (
                      <button
                        key={size.id}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${paperSize.id === size.id ? "bg-blue-50 text-blue-600" : ""}`}
                        onClick={() => {
                          setPaperSize(size);
                          setShowSizeDropdown(false);
                        }}
                      >
                        <div>
                          <div className="font-medium">{size.name}</div>
                          <div className="text-xs text-gray-500">
                            {size.width} × {size.height}
                          </div>
                        </div>
                        {paperSize.id === size.id && <Check size={16} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {isSaving ? (
                <div className="flex items-center text-gray-500 text-sm">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="text-gray-500 text-sm">{formatTime(lastSaved)}</div>
              )}

              <button
                onClick={() => setShowSharePopup(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="mx-auto overflow-hidden"
            style={{
              width: paperSize.width,
              maxWidth: "100%",
              boxShadow: "0 0 10px rgba(0,0,0,0.05)",
            }}
          >
            <div
              ref={contentEditableRef}
              contentEditable
              placeholder="Start typing..."
              className="w-full min-h-[70vh] outline-none resize-none"
              style={{
                fontFamily: font,
                fontSize: `${fontSize}pt`,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                textDecoration: isUnderline ? "underline" : "none",
                lineHeight: "1.6",
                textAlign: alignment,
                padding: "1.5in 1in 1in 1in",
                backgroundColor: "white",
                minHeight: paperSize.height,
                width: "100%",
                boxSizing: "border-box",
              }}
              onInput={(e) => {
                setContent(e.currentTarget.innerHTML);
                socket.emit('editDocument', e.currentTarget.innerHTML);
              }}
            />
          </div>

          {selectedText && (
            <div
              className="absolute bg-white shadow-lg rounded-md p-3 border border-gray-200 z-50 flex gap-2"
              style={{
                left: `${selectionPosition.x}px`,
                top: `${selectionPosition.y}px`,
              }}
            >
              <button
                onClick={() => setSelectionFormat({ ...selectionFormat, bold: !selectionFormat.bold })}
                className={`p-2 rounded-md ${selectionFormat.bold ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => setSelectionFormat({ ...selectionFormat, italic: !selectionFormat.italic })}
                className={`p-2 rounded-md ${selectionFormat.italic ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => setSelectionFormat({ ...selectionFormat, underline: !selectionFormat.underline })}
                className={`p-2 rounded-md ${selectionFormat.underline ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <Underline size={16} />
              </button>
              <select
                value={selectionFormat.font}
                onChange={(e) => setSelectionFormat({ ...selectionFormat, font: e.target.value })}
                className="border border-gray-300 rounded-md px-2 text-sm outline-none"
              >
                {fonts.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <select
                value={selectionFormat.fontSize}
                onChange={(e) => setSelectionFormat({ ...selectionFormat, fontSize: e.target.value })}
                className="border border-gray-300 rounded-md px-2 text-sm outline-none w-16"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button onClick={applyFormatToSelection} className="p-2 text-green-600 hover:bg-green-50 rounded-md">
                <Check size={16} />
              </button>
              <button onClick={() => setSelectedText(null)} className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
          <div>{content.split(/\s+/).filter(Boolean).length} words</div>
          <div className="flex items-center gap-4">
            <div>Format: {letterFormat.name}</div>
            <div>Size: {paperSize.name}</div>
            <div>Last edited: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>

      {showSharePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium mb-4">Share Document</h2>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none mb-4"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowSharePopup(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-4"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
