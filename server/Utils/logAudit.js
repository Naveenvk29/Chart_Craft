import AuditLog from "../Models/auditLogModel.js";

const logAudit = async ({
  user,
  action,
  targetId,
  targetType,
  description,
}) => {
  await AuditLog.create({
    user: user._id,
    action,
    targetId,
    targetType,
    description,
  });
};

export default logAudit;
