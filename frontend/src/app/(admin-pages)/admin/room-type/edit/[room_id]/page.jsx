import { fetchCategoryById, fetchRoomById } from '@/api/api'
import EditForm from '@/components/admin/EditForm';
import React from 'react'

export default async function page({ params }) {
    const promise = await params;
    const { success, data, message } = await fetchRoomById(promise.room_id);
    
      if (success == false) {
        throw new Error("Internal Server Error")
    }

    return (
        <EditForm data={data} api={`room-type/edit/${data._id}`} />
    )
}