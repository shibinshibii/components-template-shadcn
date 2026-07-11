import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted, Text } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { AppCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Download, User, Phone, Mail, MapPin, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock student data based on ID
  const student = {
    id,
    name: 'John Doe',
    admissionNo: '1683',
    joiningDate: '11-07-2026',
    class: '10',
    division: 'A',
    gender: 'Male',
    dob: '15-05-2010',
    bloodGroup: 'O+',
    status: 'active',
    phone: '+1 234 567 8900',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    fatherName: 'Michael Doe',
    motherName: 'Sarah Doe',
    emergencyContact: '+1 987 654 3210'
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/students')} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <PageTitle>Student Profile</PageTitle>
              <Muted>View and manage student information.</Muted>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button className="gap-2">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Overview */}
          <AppCard className="p-6 col-span-1 flex flex-col items-center text-center space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-32 w-32 rounded-full border-4 border-background shadow-md" />
                <div className="flex flex-col items-center space-y-2 w-full mt-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full mt-2" />
                
                <div className="w-full pt-4 border-t border-border mt-4 grid grid-cols-2 gap-4 text-left">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                  <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{student.name}</h2>
                  <Muted>Adm No: {student.admissionNo}</Muted>
                </div>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                  {student.status}
                </Badge>
                
                <div className="w-full pt-4 border-t border-border mt-4 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <Muted className="text-xs uppercase font-semibold">Class</Muted>
                    <Text className="font-medium">{student.class} - {student.division}</Text>
                  </div>
                  <div>
                    <Muted className="text-xs uppercase font-semibold">Gender</Muted>
                    <Text className="font-medium">{student.gender}</Text>
                  </div>
                  <div>
                    <Muted className="text-xs uppercase font-semibold">DOB</Muted>
                    <Text className="font-medium">{student.dob}</Text>
                  </div>
                  <div>
                    <Muted className="text-xs uppercase font-semibold">Blood Group</Muted>
                    <Text className="font-medium">{student.bloodGroup}</Text>
                  </div>
                </div>
              </>
            )}
          </AppCard>

          {/* Right Column - Detailed Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <AppCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Academic Details
              </h3>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <Muted className="text-sm">Joining Date</Muted>
                    <Text className="font-medium">{student.joiningDate}</Text>
                  </div>
                  <div>
                    <Muted className="text-sm">Academic Year</Muted>
                    <Text className="font-medium">2026-2027</Text>
                  </div>
                  <div>
                    <Muted className="text-sm">Current Class</Muted>
                    <Text className="font-medium">{student.class}</Text>
                  </div>
                  <div>
                    <Muted className="text-sm">Division</Muted>
                    <Text className="font-medium">{student.division}</Text>
                  </div>
                </div>
              )}
            </AppCard>

            <AppCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Contact & Parents
              </h3>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`contact-${i}`} className={i === 2 ? "sm:col-span-2 space-y-2 flex items-start gap-3" : "space-y-2 flex items-start gap-3"}>
                      <Skeleton className="h-5 w-5 rounded-full shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-2 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={`parent-${i}`} className={i === 2 ? "sm:col-span-2 space-y-2" : "space-y-2"}>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <Text className="font-medium">{student.phone}</Text>
                      <Muted className="text-xs">Student Mobile</Muted>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <Text className="font-medium">{student.email}</Text>
                      <Muted className="text-xs">Email Address</Muted>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <Text className="font-medium">{student.address}</Text>
                      <Muted className="text-xs">Permanent Address</Muted>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Muted className="text-sm">Father's Name</Muted>
                      <Text className="font-medium">{student.fatherName}</Text>
                    </div>
                    <div>
                      <Muted className="text-sm">Mother's Name</Muted>
                      <Text className="font-medium">{student.motherName}</Text>
                    </div>
                    <div className="sm:col-span-2">
                      <Muted className="text-sm">Emergency Contact (Guardian)</Muted>
                      <Text className="font-medium text-danger">{student.emergencyContact}</Text>
                    </div>
                  </div>
                </div>
              )}
            </AppCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
