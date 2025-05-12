// Models/auditLogModel.js
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  action: {
    type: String,
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  targetType: {
    type: String,
  },
  description: {
    type: String,
  },
  timestamp: { type: Date, default: Date.now },
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
