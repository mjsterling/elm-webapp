import {
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  PencilIcon,
  SquaresPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useCollection, useCrud } from "../hooks";
import { Collection } from "../models/collection";
import { useState } from "react";
import {
  DataTable,
  IconButton,
  Modal,
  StyledButton,
  StyledFab,
  StyledInput,
} from "../components";
import { useConfirmModal } from "../providers/ConfirmModalProvider";
import { DocumentData } from "firebase/firestore";
import { StyledDropdown } from "../components/StyledDropdown";

const ManageAddons = () => {
  const { confirm } = useConfirmModal();
  const [addonData, setAddonData] = useState<
    Partial<Omit<Addon, "addonType"> & { addonType: string }>
  >({});
  const [newaddonModalOpen, setNewAddonModalOpen] = useState(false);
  const addons = useCollection(Collection.addons);
  const { create, update, destroy } = useCrud(Collection.addons);

  const editAddon = (addon: DocumentData) => {
    setAddonData({ ...addon });
    setNewAddonModalOpen(true);
  };
  const headers = {
    name: "Name",
    type: "Type",
    price: "Price",
    actions: "Actions",
  };
  console.log(addonData);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 pb-24">
      <div className="flex w-full justify-center">
        <h1>Addons</h1>
      </div>
      <DataTable
        data={addons.map((addon) => {
          const { id, name, price, type } = addon;
          return {
            name,
            price: `$${price}`,
            type,
            actions: (
              <div className="flex gap-1">
                <IconButton
                  icon={<PencilIcon />}
                  onClick={() => editAddon(addon as Addon)}
                />
                <IconButton
                  icon={<TrashIcon />}
                  onClick={() => {
                    confirm({
                      onConfirm: () => {
                        destroy(id);
                      },
                      heading: "Confirm addon Deletion",
                      body: `Are you sure you wish to delete addon ${addon.addonNumber}?`,
                    });
                  }}
                />
              </div>
            ),
          };
        })}
        headers={headers}
      />
      <StyledFab
        onClick={() => setNewAddonModalOpen(true)}
        icon={<SquaresPlusIcon />}
        label="Add New Addon"
        className="fixed right-4 bottom-4"
      />
      <Modal
        className="flex flex-col gap-2"
        open={newaddonModalOpen}
        setOpen={setNewAddonModalOpen}
        title={addonData.id ? "Edit Addon" : "New Addon"}
      >
        <StyledInput
          label="Name"
          value={addonData.name}
          onChange={(e) =>
            setAddonData({
              ...addonData,
              name: e.currentTarget.value,
            })
          }
        />
        <StyledDropdown
          label="Type"
          options={["Flat", "Per person"]}
          value={addonData.type ?? ""}
          onSelect={(value) => {
            console.log("value in onselect", value);
            setAddonData({
              ...addonData,
              type: value as "Flat" | "Per person",
            });
          }}
        />
        <StyledInput
          label="Price"
          startIcon={<CurrencyDollarIcon className="h-4 w-4" />}
          value={addonData.price}
          onChange={(e) =>
            setAddonData({
              ...addonData,
              price: parseInt(e.currentTarget.value),
            })
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <StyledButton
            startIcon={<CloudArrowUpIcon />}
            onClick={async () => {
              if (addonData.id) {
                await update(addonData).then(() => {
                  setAddonData({});
                  setNewAddonModalOpen(false);
                });
              } else {
                await create(addonData).then(() => {
                  setAddonData({});
                  setNewAddonModalOpen(false);
                });
              }
            }}
            label={addonData.id ? "Update Addon" : "Create Addon"}
          />
          {addonData.id ? (
            <StyledButton
              startIcon={<TrashIcon />}
              onClick={() => {
                confirm({
                  onConfirm: async () => {
                    setAddonData({});
                    await destroy(addonData.id!);
                    setNewAddonModalOpen(false);
                  },
                  heading: "Confirm addon deletion",
                  body: `Are you sure you want to delete addon ${addonData.name}?`,
                });
              }}
              label="Delete Addon"
              theme="error"
              mode="outlined"
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ManageAddons;
