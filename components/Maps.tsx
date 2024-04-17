'use client'

import MarkerIcon from '../public/marker-icon.png'
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import './components.css'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')

const Map = () => {
    let L: any;
    if (typeof window !== 'undefined') {
        L = require('leaflet');
    }

    if(typeof window !== "undefined"){
        const height = window.innerHeight
        const width = window.innerWidth
    }     

    const longitude = 1.41749
    const latitude = 124.98396
    
    const [lecturers, setLecturers] = useState<Lecturer[]>([])

    useEffect(() => {
        const fetchLecturers = async () => {
            const { data, error } = await supabase
                .from('lecturers')
                .select('*')
            if (error) console.error('Error:', error)
            else setLecturers(data.map((item: Lecturer) => ({ ...item, type: 'lecturer' })) as Lecturer[])
        }
        fetchLecturers()
    }, [])
    
    const [buildings, setBuildings] = useState<Building[]>([])

    useEffect(() => {
        const fetchBuildings = async () => {
            const { data, error } = await supabase
                .from('buildings')
                .select('*')
            if (error) console.error('Error:', error)
            else setBuildings(data.map((item: Building) => ({ ...item, type: 'building' })) as Building[])
        }
        fetchBuildings()
    }, [])                

    

    type Lecturer = {
        id: number;
        name: string;
        longitude: number;
        latitude: number;
        noHouse: string;
        type: string;
    }

    type Building = {
        id: number;
        name: string;
        longitude: number;
        latitude: number;
        noHouse: string;
        type: string;
    }

    const [searchTerm, setSearchTerm] = useState('')
    const [searchType, setSearchType] = useState<'lecturers' | 'buildings' | 'all'>('lecturers')
    const [markerMap, setMarkerMap] = useState<(Lecturer | Building)[]>([])


    useEffect(() => {
        setMarkerMap([...lecturers, ...buildings]);
        setSearchType('all')
    }, [lecturers, buildings]);

    const handleShowAll = () => {
        setSearchType('all')
        setMarkerMap([...lecturers, ...buildings])
    }

    const handleShowAllUsers = () => {
        setSearchType('lecturers')
        setMarkerMap(lecturers)
    }

    const handleShowAllBuildings = () => {
        setSearchType('buildings')
        setMarkerMap(buildings)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (searchType === 'all') {
            setSearchTerm(event.target.value)
            const filteredAll = [...lecturers, ...buildings].filter((item: Lecturer | Building) => 
                item.name && item.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setMarkerMap([...filteredAll])
            console.log(`search type : ${searchType}`)
        } else if(searchType === 'lecturers'){
            setSearchTerm(event.target.value)
            const filteredUsers = lecturers.filter((lecturer: Lecturer) => lecturer.name && lecturer.name.toLowerCase().includes(event.target.value?.toLowerCase()))
            setMarkerMap([...filteredUsers])
            console.log(`search type : ${searchType}`)
        }   else if(searchType === 'buildings') {
            setSearchTerm(event.target.value)
            const filteredBuildings = buildings.filter((building: Building) => building.name && building.name.toLowerCase().includes(event.target.value?.toLowerCase()))
            setMarkerMap([...filteredBuildings]) 
            console.log(`search type : ${searchType}`)
        }
    }

    

    return (
        <div>
            <form>
                <input className="search-box" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search" />
            </form>

            <nav className="navbar flexBetween max-container padding-container relative z-30 py-5">
                <ul className="nav-items hidden h-full gap-12 lg:flex">
                    <li className="font-bold nav-button" onClick={handleShowAll}>
                        <button className="btn-all btn btn-primary" ><span>Lingkungan UNKLAB</span></button>
                    </li>
                    <li className="font-bold nav-button" onClick={handleShowAllBuildings}>
                        <button className="btn-gedung btn btn-primary" ><span>Gedung UNKLAB</span></button>
                    </li>
                    <li className="font-bold nav-button"  onClick={handleShowAllUsers}>
                        <button className="btn-rumah btn btn-primary"><span>Rumah Dosen </span></button>
                    </li>
                </ul>
            </nav>

            <MapContainer className='maps-main' center={[longitude, latitude]} zoom={17} scrollWheelZoom={true} touchZoom={true} doubleClickZoom={true}>
                <TileLayer className='tile-layer'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

{markerMap.map((item, index) => (
    <Marker key={index} position={[item.longitude, item.latitude]} icon={
        new L.Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: MarkerShadow.src,
            shadowSize: [41, 41],
        })
    }>
        <Popup>
            <h1 className='marker-name'>
                {item.type === 'lecturer' && item.noHouse}
                <br />
                {item.name}
            </h1>
            {item.type === 'building' && <Link className='build-button' href={`navigation/${item.id}`}>View Details</Link>}
        </Popup>
    </Marker>
))}

            </MapContainer>

        </div>
    )
}


export default Map