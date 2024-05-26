import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export const ChartBar = () => {
    const Arr = [
        {
            name: 'January',
            totalSale: 1000,
            itemSold: 5,
            UnsoldIten: 10,
        },
        {
            name: 'February',
            totalSale: 1500,
            itemSold: 8,
            UnsoldIten: 9,
        },
        {
            name: 'March',
            totalSale: 2000,
            itemSold: 15,
            UnsoldIten: 12,
        },
    ];

    return (
        <div className='my-5' style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Arr}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalSale" fill='cyan' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
