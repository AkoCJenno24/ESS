import { useEffect, useMemo, useState } from "react"

export type AttendanceSession = {
  inAt: string
  outAt: string | null
}

export type TodayAttendance = {
  date: string
  isClockedIn: boolean
  clockedInAt: string | null
  clockedOutAt: string | null
  totalMs: number
  sessions: AttendanceSession[]
}

const STORAGE_KEY = "attendance.today"

const getTodayDate = () => new Date().toISOString().slice(0, 10)

const createInitialAttendance = (): TodayAttendance => ({
  date: getTodayDate(),
  isClockedIn: false,
  clockedInAt: null,
  clockedOutAt: null,
  totalMs: 0,
  sessions: [],
})

export const formatTime = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--"

export const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}h ${minutes}m ${seconds}s`
}

export function useAttendanceClock() {
  const [attendance, setAttendance] = useState<TodayAttendance>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialAttendance()

    try {
      const parsed = JSON.parse(raw) as TodayAttendance
      return parsed.date === getTodayDate() ? parsed : createInitialAttendance()
    } catch {
      return createInitialAttendance()
    }
  })

  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (attendance.date !== getTodayDate()) {
      setAttendance(createInitialAttendance())
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance))
  }, [attendance])

  const liveSessionMs = useMemo(() => {
    if (!attendance.isClockedIn || !attendance.clockedInAt) return 0
    return Math.max(0, now - new Date(attendance.clockedInAt).getTime())
  }, [attendance.isClockedIn, attendance.clockedInAt, now])

  const totalWorkedMs = attendance.totalMs + liveSessionMs

  const clockIn = () => {
    if (attendance.isClockedIn) return

    const inAt = new Date().toISOString()
    setAttendance((prev) => ({
      ...prev,
      isClockedIn: true,
      clockedInAt: inAt,
      clockedOutAt: null,
      sessions: [...prev.sessions, { inAt, outAt: null }],
    }))
  }

  const clockOut = () => {
    if (!attendance.isClockedIn || !attendance.clockedInAt) return

    const outAt = new Date().toISOString()
    const sessionMs = Math.max(
      0,
      new Date(outAt).getTime() - new Date(attendance.clockedInAt).getTime()
    )

    setAttendance((prev) => ({
      ...prev,
      isClockedIn: false,
      clockedOutAt: outAt,
      totalMs: prev.totalMs + sessionMs,
      sessions: prev.sessions.map((s, i) =>
        i === prev.sessions.length - 1 ? { ...s, outAt } : s
      ),
    }))
  }

  const resetToday = () => setAttendance(createInitialAttendance())

  return {
    attendance,
    totalWorkedMs,
    clockIn,
    clockOut,
    resetToday,
  }
}