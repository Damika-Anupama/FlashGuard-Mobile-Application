import { ScrollView, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Card, DataTable } from 'react-native-paper'
import IncidentsContext from '../contexts/IncidentsContext'

const numberOfItemsPerPageList = [10, 50, 100]

const formatDate = (date) => {
  // Format date to DD/MM/YY from string "2023-01-15T10:04:26.904Z"
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.slice(-2)
  const day = `0${d.getDate()}`.slice(-2)
  return `${day}/${month}/${year}`
}

const formatTime = (date) => {
  // Format time to HH:MM PM from string "2023-01-15T10:04:26.904Z"
  const d = new Date(date)
  const hours = d.getHours()
  const minutes = `0${d.getMinutes()}`.slice(-2)
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes} ${ampm}`
}

export default function Incidents() {
  const { incidents } = useContext(IncidentsContext)

  const [page, setPage] = useState(0)
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  )
  const from = page * numberOfItemsPerPage
  const to = Math.min((page + 1) * numberOfItemsPerPage, incidents.length)

  return (
    <Card className="m-4 bg-white">
      <Card.Content>
        <Text className="mb-4 text-xl font-bold ">Incidents</Text>
        <Text className="mb-2 text-gray-700">
          Here are your reported incidents. These will be used to calibrate and
          improve your device&apos;s detection capabilities.
        </Text>
        <ScrollView horizontal>
          <DataTable className="w-[20rem]">
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Start Time</DataTable.Title>
              <DataTable.Title>End Time</DataTable.Title>
              <DataTable.Title>Severity</DataTable.Title>
            </DataTable.Header>
            {incidents.slice(from, to).map((incident) => (
              <DataTable.Row key={incident.id}>
                <DataTable.Cell>{formatDate(incident.endTime)}</DataTable.Cell>
                <DataTable.Cell>
                  {incident.errorType === 1 ? 'FN' : 'FP'}
                </DataTable.Cell>
                <DataTable.Cell>
                  {formatTime(incident.startTime)}
                </DataTable.Cell>
                <DataTable.Cell>{formatTime(incident.endTime)}</DataTable.Cell>
                <DataTable.Cell>
                  {['Low', 'Medium', 'High'][incident.severity - 1]}
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(incidents.length / numberOfItemsPerPage)}
              onPageChange={(p) => setPage(p)}
              label={`${from + 1}-${to} of ${incidents.length}`}
              showFastPaginationControls
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={numberOfItemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel="Rows per page"
            />
          </DataTable>
        </ScrollView>
      </Card.Content>
    </Card>
  )
}
