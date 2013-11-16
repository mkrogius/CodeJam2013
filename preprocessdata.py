import datetime
import dateutil.parser

def interpolate(prev, next, step):
    return (next - prev)*(step/4.0)+prev
    

def preprocessData(data):
     date = dateutil.parser.parse(data[0])
     utcdate = date.astimezone()
     retdata = []
     doy = (utcdate - datetime.datetime(utcdate.year,1,1,0,0,0,0,utcdate.tzinfo)).days
     retdata.append(str(doy))
     retdata.append(str(utcdate.weekday()))
     retdata.append(str(utcdate.hour*60+utcdate.minute))

     retdata.append(str(data[1]))
     retdata.append(str(data[2]))
     retdata.append(str(data[3]))
     retdata.append(str(data[4]))
     retdata.append(str(data[5]))

     return ",".join(retdata)

csvin = open("data_set.csv")
csvout = open("final_data_set.csv", 'w')



csvout.write("doy,weekday,time,Montreal Net Radiation - CWTA (W/m2),Montreal Relative Humidity - CWTA,Montreal Temperature - CWTA (C),Montreal Wind Speed - CWTA (km/h),Real Power Demand - Downtown Main Entrance (kW)\n")
csvin.readline() #Throw out old header

prev = csvin.readline()
prevdata = prev.split(",")
csvout.write(preprocessData(prevdata))

lines = ['1','2','3'] #allocation!

while True:
    lines[0] = csvin.readline()
    lines[1] = csvin.readline()
    lines[2] = csvin.readline()
    next = csvin.readline()
    nextdata = next.split(",")
    for i,line in enumerate(lines):
        linedata = line.split(",")
        for j in range(1,5):
            linedata[j] = interpolate(float(prevdata[j]),float(nextdata[j]),i+1)
        csvout.write(preprocessData(linedata))
    csvout.write(preprocessData(nextdata))
    prevdata = nextdata


csvin.close()
csvout.close()


