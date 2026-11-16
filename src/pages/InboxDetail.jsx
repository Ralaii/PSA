import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import ConfirmDeleteDialog from "../components/ui/ConfirmDeleteDialog";
import InboxDetailToolbar from "../components/inbox/InboxDetailToolbar";
import InboxMessage from "../components/inbox/InboxMessage";
import { useInboxNeighbors } from "../hooks/useInboxNeighbors";
import { useNotification } from "../hooks/useNotification";
import { useInboxActions } from "../hooks/useInboxActions";

function InboxDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const { data: notification, isLoading, isError } = useNotification(id);
  const { position, total, newer, older } = useInboxNeighbors(id);
  const actions = useInboxActions();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const goTo = (n) => navigate({ pathname: `/inbox/${n.id}`, search });

  const confirmDelete = () => {
    if (!notification) return;
    actions.remove(notification.id, {
      onSuccess: () => navigate({ pathname: "/inbox", search }),
    });
  };

  return (
    <>
      <InboxDetailToolbar
          notification={notification}
          togglePending={actions.isTogglePending}
          onToggleRead={() => notification && actions.toggleRead(notification)}
          onDelete={() => setConfirmOpen(true)}
          position={position}
          total={total}
          onNewer={newer ? () => goTo(newer) : null}
          onOlder={older ? () => goTo(older) : null}
        />
      <div>
        

        <div className="mx-auto max-w-5xl">
          <InboxMessage
            notification={notification}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        <ConfirmDeleteDialog
          notification={confirmOpen ? notification : null}
          pending={actions.isDeleting}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </>
  );
}

export default InboxDetail;