import React, { useEffect, useState } from "react";
import {
    Link2,
    Copy,
    ExternalLink,
    Download,
    MousePointerClick,
    Globe,
    Smartphone,
    Monitor,
    Shield,
    Trash2,
    Calendar,
    Clock3,
    Pencil,
    QrCode,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useParams } from "@tanstack/react-router";
import { deleteShortUrl, getShortUrl } from "../api/shortUrl";

function UrlDetail() {
    const { shortUrl } = useParams({ from: "/url/$shortUrl" });
    const [qrStyle, setQrStyle] = useState("rounded");
    const [ShortUrlData, setShortUrlData] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(async () => {
        const shortUrlData = await getShortUrl(shortUrl);
        setShortUrlData(shortUrlData);
    }, [shortUrl]);

    const url = {
        shortUrl: ShortUrlData.shortUrl,
        fullUrl: ShortUrlData.fullUrl,
        createdAt: ShortUrlData.createdAt,
        clicks: ShortUrlData.clicks,
    };

    const copyLink = () => {
        navigator.clipboard.writeText(backendUrl + "/" + url.shortUrl);
    };

    const downloadQR = () => {
        const canvas = document.getElementById("qr-code");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        downloadLink.click();
    };

    const handleDelete = async() => {
        const confirmation = window.confirm("This action will delete the "+ url.shortUrl +" url")
        if(!confirmation) return;
        await deleteShortUrl(url.shortUrl);
        alert("Url deleted successfully")
        window.location.href = "/dashboard";
    };
    const handleEdit = (url) => {alert("Edit functionality is not implemented yet for " + url.shortUrl)};

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                        <div>
                            <p className="text-indigo-600 font-semibold flex items-center gap-2">
                                <Link2 size={18} />
                                {url.shortUrl}
                            </p>

                            <p className="text-slate-500 mt-2 break-all">
                                {url.fullUrl}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Calendar size={15} />
                                    {url.createdAt}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={copyLink}
                                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 h-fit"
                            >
                                <Copy size={16} />
                                Copy
                            </button>

                            <button
                                onClick={() =>
                                    window.open(
                                        backendUrl + "/" + url.shortUrl,
                                        "_blank",
                                    )
                                }
                                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white h-fit"
                            >
                                <ExternalLink size={16} />
                                Open
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                        {
                            title: "Total Clicks",
                            value: url.clicks,
                            icon: MousePointerClick,
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm"
                        >
                            <item.icon className="w-5 h-5 text-slate-500" />
                            <h3 className="text-2xl font-bold mt-4">
                                {item.value}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                {item.title}
                            </p>
                        </div>
                    ))}

                    {/* Left */}

                    {/* Right */}
                    {/* QR */}
                    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <QrCode size={18} />
                            <h2 className="font-semibold">QR Code</h2>
                        </div>

                        <div className="flex justify-center mb-5">
                            <QRCodeCanvas
                                id="qr-code"
                                value={backendUrl + "/" + url.shortUrl}
                                size={200}
                                level="H"
                                bgColor="#ffffff"
                                fgColor="#111827"
                            />
                        </div>

                        <button
                            onClick={downloadQR}
                            className="w-full rounded-2xl bg-slate-900 text-white py-3 flex justify-center gap-2 cursor-pointer"
                        >
                            <Download size={16} />
                            Download QR
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
                        <button
                            className="cursor-pointer w-full rounded-2xl border border-slate-200 py-3 flex justify-center gap-2"
                            onClick={() => handleEdit(url)}
                        >
                            <Pencil size={16} />
                            Edit Link
                        </button>

                        <button
                            className="cursor-pointer w-full rounded-2xl border border-red-200 text-red-500 py-3 flex justify-center gap-2"
                            onClick={() => handleDelete()}
                        >
                            <Trash2 size={16} />
                            Delete Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UrlDetail;
