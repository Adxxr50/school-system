import { useApp } from '../../context/AppContext';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { schedule } from '../../data/dummyData';

const dayColors = {
  Monday: 'border-l-blue-500',
  Tuesday: 'border-l-green-500',
  Wednesday: 'border-l-purple-500',
  Thursday: 'border-l-yellow-500',
  Friday: 'border-l-red-500',
};

export default function StudentSchedule() {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  const classSchedule = schedule[currentUser.className] || [];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-600 mt-1">Weekly timetable for Class {currentUser.className}</p>
      </div>

      {/* Desktop view - Table */}
      <div className="hidden lg:block">
        <Card>
          <CardBody className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-24">Time</th>
                  {classSchedule.map(day => (
                    <th
                      key={day.day}
                      className={`px-4 py-3 text-left text-sm font-medium ${
                        day.day === today ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                      }`}
                    >
                      {day.day}
                      {day.day === today && (
                        <span className="ml-2 text-xs bg-blue-100 px-2 py-0.5 rounded-full">Today</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {classSchedule[0]?.periods.map((_, periodIdx) => (
                  <tr key={periodIdx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500 font-medium">
                      {classSchedule[0].periods[periodIdx].time}
                    </td>
                    {classSchedule.map(day => {
                      const period = day.periods[periodIdx];
                      const isLunch = period.subject === 'Lunch';
                      const isToday = day.day === today;

                      return (
                        <td
                          key={`${day.day}-${periodIdx}`}
                          className={`px-4 py-3 ${isToday ? 'bg-blue-50/50' : ''}`}
                        >
                          {isLunch ? (
                            <div className="text-center text-gray-400 text-sm">
                              Lunch Break
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{period.subject}</p>
                              <p className="text-xs text-gray-500">{period.room}</p>
                              <p className="text-xs text-gray-400">{period.teacher}</p>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

      {/* Mobile view - Cards */}
      <div className="lg:hidden space-y-6">
        {classSchedule.map((day) => (
          <Card
            key={day.day}
            className={`overflow-hidden border-l-4 ${dayColors[day.day]}`}
          >
            <CardHeader className={day.day === today ? 'bg-blue-50' : ''}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">{day.day}</h2>
                {day.day === today && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Today
                  </span>
                )}
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y">
                {day.periods.map((period, idx) => {
                  const isLunch = period.subject === 'Lunch';

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 px-4 py-3 ${
                        isLunch ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="text-sm text-gray-500 w-20 flex-shrink-0">
                        <Clock size={14} className="inline mr-1" />
                        {period.time.split('-')[0]}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isLunch ? 'text-gray-400' : 'text-gray-900'}`}>
                          {period.subject}
                        </p>
                        {!isLunch && (
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {period.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {period.teacher}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {classSchedule.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Calendar className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No schedule available</h3>
            <p className="mt-2 text-gray-500">Schedule for your class hasn't been set up yet</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
