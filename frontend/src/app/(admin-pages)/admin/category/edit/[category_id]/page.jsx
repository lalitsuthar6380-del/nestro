import { fetchCategoryById } from '@/api/api'
import EditForm from '@/components/admin/EditForm';
import React from 'react'

export default async function page({ params }) {
    const promise = await params;
    const { success, data, message } = await fetchCategoryById(promise.category_id);
    
      if (success == false) {
        throw new Error("Internal Server Error")
    }

    return (
        <EditForm data={data} api={`category/edit/${data._id}`} />
    )
}
