using System;
namespace FaultReportingApi.Models
{
    /// <summary>
    /// Represents an infrastructure fault report in the system
    /// Contains all necessary information to track and manage fault incidents
    /// </summary>
    public class InfrastructureFault
    {
        /// <summary>
        /// Unique identifier for each fault report
        /// Generated automatically when creating new faults
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Detailed description of the fault provided by the reporter
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Timestamp when the fault was reported
        /// Set automatically by the system on creation
        /// </summary>
        public DateTime ReportedAt { get; set; }
        /// <summary>
        /// Geographic latitude coordinate of the fault location
        /// Captured from map click interaction
        /// </summary>
        public double Latitude { get; set; }
        /// <summary>
        /// Geographic longitude coordinate of the fault location
        /// Captured from map click interaction
        /// </summary>
        public double Longitude { get; set; }
        /// <summary>
        /// Type of infrastructure fault using predefined categories
        /// Maps to FaultTypeEnum values
        /// </summary>
        public FaultTypeEnum FaultType { get; set; }

        /// <summary>
        /// Current status of the fault report for tracking purposes
        /// Defaults to Open when first created
        /// </summary>
        public StatusEnum Status { get; set; }

        /// <summary>
        /// Enumeration defining the types of infrastructure faults
        /// Provides consistent categorization across the system
        /// </summary>
        public enum FaultTypeEnum
        {
            CutCable,
            DamagedPole,
            TangledWire,
            Other
        }
        /// <summary>
        /// Enumeration defining the possible states of a fault report
        /// Enables tracking of fault resolution progress
        /// </summary>
        public enum StatusEnum
        {
            Open,
            InProgress,
            Resolved

        }
    }
}