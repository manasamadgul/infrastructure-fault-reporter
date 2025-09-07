using System;
namespace FaultReportingApi.Models
{
    public class InfrastructureFault
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime ReportedAt { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public FaultTypeEnum FaultType { get; set; }
        public StatusEnum Status { get; set; }

        public enum FaultTypeEnum
        {
            CutCable,
            DamagedPole,
            TangledWire,
            Other
        }
        public enum StatusEnum
        {
            Open,
            InProgress,
            Resolved

        }
    }
}