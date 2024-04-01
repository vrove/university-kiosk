'use client'

import L from 'leaflet'
import MarkerIcon from '../public/marker-icon.png'
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import './components.css'
import Link from 'next/link'

const Map = () => {
    const longitude = 1.41749
    const latitude = 124.98396

    useEffect(() => {
        fetch('http://localhost:5500/api/lecturers')
            .then(response => response.json())
            .then(data => setLecturers(data.map(item => ({ ...item, type: 'lecturer' }))))
            .catch(error => console.error('Error:', error));
    }, []);
    
    useEffect(() => {
        fetch('http://localhost:5500/api/buildings')
            .then(response => response.json())
            .then(data => setBuildings(data.map(item => ({ ...item, type: 'building' }))))
            .catch(error => console.error('Error:', error));
    }, []);

    const [buildings, setBuildings] = useState([])
    const [lecturers, setLecturers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchType, setSearchType] = useState<'lecturers' | 'buildings' | 'all'>('lecturers')
    const [markerMap, setMarkerMap] = useState<(Lecturer | Building)[]>([])

    
    useEffect(() => {
        setMarkerMap([...lecturers, ...buildings]);
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
            const filteredAll = [...lecturers, ...buildings].filter(item => 
                item.name && item.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setMarkerMap([...filteredAll])
            console.log(`search type : ${searchType}`)
        } else if(searchType === 'lecturers'){
            setSearchTerm(event.target.value)
            const filteredUsers = lecturers.filter(lecturers => lecturers.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setMarkerMap([...filteredUsers])
            console.log(`search type : ${searchType}`)
        }   else if(searchType === 'buildings') {
            setSearchTerm(event.target.value)
            const filteredBuildings = buildings.filter(building => building.name.toLowerCase().includes(event.target.value.toLowerCase()))
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