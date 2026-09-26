"use client";

import React, { useEffect, useState } from "react";
import { createSlug, client } from '@/utils/helper';
import { fetchCategory, fetchRooms } from "@/api/api";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const router = useRouter();

    const initialState = {
        title: "",
        slug: "",
        shortDescription: "",
        description: "",

        category: "",
        roomType: "",

        price: "",
        salePrice: "",
        discount: "",

        stock: true,

        material: "Wood",
        color: "",

        length: "",
        width: "",
        height: "",

        weight: "",

        featured: false,
        bestSeller: false,
        newArrival: false,
        status: true,

        thumbnail: null,
    };

    const [data, setData] = useState(initialState);

    const [preview, setPreview] = useState("");
    const [category, setCategory] = useState([]);
    const [room, setRoom] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const [category_response, room_response] = await Promise.all([
                    fetchCategory(),
                    fetchRooms()
                ]);

                if (category_response.success) {
                    setCategory(category_response.data);
                }

                if (room_response.success) {
                    setRoom(room_response.data);
                }

            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchAPI();
    }, []);



    // Text / Number / Select
    const handleChange = (e) => {

        const { name, value } = e.target;

        const price = name === "price" ? parseInt(value) || 0 : parseInt(data.price) || 0;
        const salePrice = name === "salePrice" ? parseInt(value) || 0 : parseInt(data.salePrice) || 0;

        setData((prev) => ({
            ...prev,
            [name]: value,
            discount: price ? Math.round((price - salePrice) / price * 100) : "",
            ...(name === "title" && {
                slug: createSlug(value),
            }),
        }));
    };

    // Thumbnail
    const handleThumbnail = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setData((prev) => ({
            ...prev,
            thumbnail: file,
        }));

        setPreview(URL.createObjectURL(file));
    };

    // Switch
    const toggleSwitch = (field) => {
        setData((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();

            Object.keys(data).forEach(
                (key) => {
                    payload.append(key, data[key]);
                }
            );

            const response = await client.post('/product/create', payload);

            if (response.data.success) {
                toast.success(response.data.message);
                router.push('/admin/product');
            }

        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                'Internal Server Error'
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="bg-white border border-[#e5e9ee] rounded-2xl overflow-hidden">

                <div className="border-b border-[#e8ebef] p-6">
                    <h1 className="text-2xl font-bold text-[#0f2942]">
                        Add Product
                    </h1>

                    <p className="text-sm text-[#7b8794] mt-1">
                        Fill all product information.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-10"
                >

                    {/* Basic Information */}
                    <section>
                        <h2 className="font-semibold text-lg mb-5 text-[#0f2942]">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-medium text-[#102a43] block mb-2">
                                    Product Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Wooden Sofa"
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] placeholder:text-[#9aa5b1] focus:border-[#00a79d] transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#102a43] block mb-2">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-[#102a43] block mb-2">
                                Short Description
                            </label>

                            <textarea
                                rows={3}
                                name="shortDescription"
                                value={data.shortDescription}
                                onChange={handleChange}
                                className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl p-4 outline-none resize-none text-[#102a43] focus:border-[#00a79d] transition"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-[#102a43] block mb-2">
                                Description
                            </label>

                            <textarea
                                rows={6}
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl p-4 outline-none resize-none text-[#102a43] focus:border-[#00a79d] transition"
                            />
                        </div>
                    </section>

                    {/* Category */}
                    <section>
                        <h2 className="text-lg font-semibold mb-5 text-[#0f2942]">
                            Category Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={data.category}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                >
                                    <option value="">Select Category</option>

                                    {/* Map Category Here */}


                                    {category.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}


                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Room Type
                                </label>

                                <select
                                    name="roomType"
                                    value={data.roomType}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                >
                                    <option value="">
                                        Select Room Type
                                    </option>

                                    {/* Map Room Types */}

                                    {room.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section>
                        <h2 className="text-lg font-semibold mb-5 text-[#0f2942]">
                            Pricing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={data.price}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Sale Price
                                </label>

                                <input
                                    type="number"
                                    name="salePrice"
                                    value={data.salePrice}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Discount %
                                </label>

                                <input
                                    type="number"
                                    name="discount"
                                    value={data.discount}
                                    placeholder="Enter price and sale price"
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Furniture Details */}
                    <section>
                        <h2 className="text-lg font-semibold mb-5 text-[#0f2942]">
                            Furniture Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Material
                                </label>

                                <select
                                    name="material"
                                    value={data.material}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                >
                                    <option>Wood</option>
                                    <option>Sheesham</option>
                                    <option>Engineered Wood</option>
                                    <option>Metal</option>
                                    <option>Steel</option>
                                    <option>Plastic</option>
                                    <option>Glass</option>
                                    <option>Marble</option>
                                    <option>Fabric</option>
                                    <option>Leather</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Color
                                </label>

                                <input
                                    type="text"
                                    name="color"
                                    value={data.color}
                                    onChange={handleChange}
                                    placeholder="Walnut"
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] placeholder:text-[#9aa5b1] focus:border-[#00a79d] transition"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Length
                                </label>

                                <input
                                    type="number"
                                    name="length"
                                    value={data.length}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Width
                                </label>

                                <input
                                    type="number"
                                    name="width"
                                    value={data.width}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Height
                                </label>

                                <input
                                    type="number"
                                    name="height"
                                    value={data.height}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Weight (Kg)
                                </label>

                                <input
                                    type="number"
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    className="w-full border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-4 py-3 outline-none text-[#102a43] focus:border-[#00a79d] transition"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Thumbnail */}
                    <section>
                        <h2 className="text-lg font-semibold mb-5 text-[#0f2942]">
                            Product Thumbnail
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Thumbnail Image
                                </label>

                                <div className="border-2 border-dashed border-[#dfe3e8] bg-[#fafbfc] rounded-xl p-5">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnail}
                                        className="w-full text-sm text-[#64748b] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#00a79d] file:text-white file:font-medium hover:file:bg-[#008f86] file:cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#102a43] mb-2">
                                    Preview
                                </label>

                                <div className="w-52 h-52 border-2 border-dashed border-[#dfe3e8] rounded-xl overflow-hidden bg-[#fafbfc] flex items-center justify-center">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[#9aa5b1] text-sm">
                                            No Image Selected
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Product Settings */}
                    <section>
                        <h2 className="text-lg font-semibold mb-5 text-[#0f2942]">
                            Product Settings
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="flex items-center justify-between border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-5 py-4 cursor-pointer">
                                <span className="text-sm font-medium text-[#102a43]">
                                    In Stock
                                </span>

                                <input
                                    type="checkbox"
                                    checked={data.stock}
                                    onChange={() => toggleSwitch("stock")}
                                    className="h-5 w-5 accent-[#00a79d]"
                                />
                            </label>

                            <label className="flex items-center justify-between border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-5 py-4 cursor-pointer">
                                <span className="text-sm font-medium text-[#102a43]">
                                    Featured Product
                                </span>

                                <input
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={() => toggleSwitch("featured")}
                                    className="h-5 w-5 accent-[#00a79d]"
                                />
                            </label>

                            <label className="flex items-center justify-between border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-5 py-4 cursor-pointer">
                                <span className="text-sm font-medium text-[#102a43]">
                                    Best Seller
                                </span>

                                <input
                                    type="checkbox"
                                    checked={data.bestSeller}
                                    onChange={() => toggleSwitch("bestSeller")}
                                    className="h-5 w-5 accent-[#00a79d]"
                                />
                            </label>

                            <label className="flex items-center justify-between border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-5 py-4 cursor-pointer">
                                <span className="text-sm font-medium text-[#102a43]">
                                    New Arrival
                                </span>

                                <input
                                    type="checkbox"
                                    checked={data.newArrival}
                                    onChange={() => toggleSwitch("newArrival")}
                                    className="h-5 w-5 accent-[#00a79d]"
                                />
                            </label>

                            <label className="flex items-center justify-between border border-[#dfe3e8] bg-[#f8f9fa] rounded-xl px-5 py-4 cursor-pointer">
                                <span className="text-sm font-medium text-[#102a43]">
                                    Active Status
                                </span>

                                <input
                                    type="checkbox"
                                    checked={data.status}
                                    onChange={() => toggleSwitch("status")}
                                    className="h-5 w-5 accent-[#00a79d]"
                                />
                            </label>
                        </div>
                    </section>

                    {/* Submit */}
                    <section className="border-t border-[#e8ebef] pt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            className="border border-[#dfe3e8] bg-white text-[#102a43] px-6 py-3 rounded-xl font-medium hover:bg-[#f8f9fa] transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-[#00a79d] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#008f86] transition"
                        >
                            Create Product
                        </button>
                    </section>

                </form>
            </div>
        </div>

    );

}